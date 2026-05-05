'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program_Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Program_Schedule.init({
    schedule_ID: DataTypes.INTEGER,
    program_ID: DataTypes.INTEGER,
    schedule_day_type_ID: DataTypes.INTEGER,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    effective_start_date: DataTypes.DATE,
    effective_end_date: DataTypes.DATE,
    scheduled_by_admin_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Program_Schedule',
  });
  return Program_Schedule;
};