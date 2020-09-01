'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { 
        foreignKey : {
          name : 'userId'
        }
      })
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        notNull : {
          msg : 'email is required'
        },
        notEmpty : {
          args : true,
          msg : 'email is required'
        },
        isEmail : {
          args : true,
          msg : 'invalid email'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'password is required'
        },
        notEmpty : {
          args : true,
          msg : 'password is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate : (user, opt) => {
        user.password = hashPassword(user.password);
      }
    }
  });
  return User;
};