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
       Program_Schedule.belongsTo(models.Program, {
    foreignKey: "program_ID"
  });

  Program_Schedule.belongsTo(models.Schedule_Day_Type, {
    foreignKey: "schedule_day_type_ID"
  });

  Program_Schedule.belongsTo(models.Admin, {
    foreignKey: "scheduled_by_admin_ID"
  });
    }
  }
  Program_Schedule.init({
    schedule_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
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
    tableName: 'Program_Schedule',
    timestamps: false
  });
  return Program_Schedule;
};