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
    schedule_day_type_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    schedule_day_type: DataTypes.ENUM('WEEKDAYS', 'SATURDAY', 'SUNDAY')
  }, {
    sequelize,
    modelName: 'Schedule_Day_Type',
    tableName: 'Schedule_Day_Type',
    timestamps: false
  });
  return Schedule_Day_Type;
};