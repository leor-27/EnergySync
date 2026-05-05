'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program_DJ_Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Program_DJ_Assignment.init({
    assignment_ID: DataTypes.INTEGER,
    dj_ID: DataTypes.INTEGER,
    program_ID: DataTypes.INTEGER,
    effective_start_date: DataTypes.DATE,
    effective_end_date: DataTypes.DATE,
    assigned_by_admin_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Program_DJ_Assignment',
  });
  return Program_DJ_Assignment;
};