'use strict';
const {
  Model
} = require('sequelize');

const { isDate, getCurrentDate } = require('@esmilo/vremya');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, { 
        foreignKey : {
          name : 'userId'
        } 
      })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'title is required'
        },
        notEmpty : {
          args : true,
          msg : 'title is required'
        }
      }
    },
    description: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'description is required'
        },
        notEmpty : {
          args : true,
          msg : 'description is required'
        }
      }
    },
    status: {
      type : DataTypes.BOOLEAN
    },
    due_date: {
      type : DataTypes.DATE,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'due date is required'
        },
        notEmpty : {
          args : true,
          msg : 'due date is required'
        },
        isBeforeToday (value) {
          if(isDate(value.toISOString().split('T')[0]).before(getCurrentDate())) {
            throw new Error('due date must be at least today or ahead')
          }
        }
      }
    },
    userId: {
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};