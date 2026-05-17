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
       Program_DJ_Assignment.belongsTo(models.DJ, {
    foreignKey: "dj_ID"
  });

  Program_DJ_Assignment.belongsTo(models.Program, {
    foreignKey: "program_ID"
  });

  Program_DJ_Assignment.belongsTo(models.Admin, {
    foreignKey: "assigned_by_admin_ID"
  });

  Program_DJ_Assignment.hasMany(models.DJ_Availability, {
    foreignKey: "assignment_ID"
  });

  Program_DJ_Assignment.hasMany(models.Substitutions, {
    foreignKey: "assignment_ID"
  });
    }
  }
  Program_DJ_Assignment.init({
    assignment_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    dj_ID: DataTypes.INTEGER,
    program_ID: DataTypes.INTEGER,
    effective_start_date: DataTypes.DATE,
    effective_end_date: DataTypes.DATE,
    assigned_by_admin_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Program_DJ_Assignment',
    tableName: 'Program_DJ_Assignment',
    timestamps: false
  });
  return Program_DJ_Assignment;
};