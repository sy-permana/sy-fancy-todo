'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Title cannot empty'
        },
        notEmpty : {
          args : true,
          msg : 'Title cannot empty'
        }
      }
    },
    description: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Description cannot empty'
        },
        notEmpty : {
          args : true,
          msg : 'Description cannot empty'
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
          msg : 'Due date cannot empty'
        },
        notEmpty : {
          args : true,
          msg : 'Due date cannot empty'
        },
        isAfter : {
          args : new Date().toISOString(),
          msg : 'Due date must be greater than today'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};