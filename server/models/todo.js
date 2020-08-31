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
      validate : {
        notEmpty : {
          args : true,
          msg : 'field title is required.'
        }
      }
    },
    description: {
      type : DataTypes.TEXT,
      validate : {
        notEmpty : {
          args : true,
          msg : 'please input description'
        }
      }
    },
    status: {
      type : DataTypes.BOOLEAN
    },
    due_date: {
      type : DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};