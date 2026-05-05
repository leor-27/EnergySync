'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule_Day_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Schedule_Day_Type.init({
    schedule_day_type_ID: DataTypes.INTEGER,
    schedule_day_type: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Schedule_Day_Type',
  });
  return Schedule_Day_Type;
};