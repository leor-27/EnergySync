'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DJ_Availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DJ_Availability.belongsTo(models.Program_DJ_Assignment, {
    foreignKey: "assignment_ID"
  });

  DJ_Availability.belongsTo(models.Admin, {
    foreignKey: "reviewed_by_admin_ID"
  });
    }
  }
  DJ_Availability.init({
    availability_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    assignment_ID: DataTypes.INTEGER,
    broadcast_date: DataTypes.DATEONLY,
    remarks: DataTypes.STRING,
    declared_at: DataTypes.DATE,
    status: DataTypes.ENUM('Available', 'Unavailable'),
    approval_status: DataTypes.ENUM('Pending', 'Accepted', 'Rejected'),
    reviewed_at: DataTypes.DATE,
    reviewed_by_admin_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DJ_Availability',
    tableName: 'DJ_Availability',
    timestamps: false
  });
  return DJ_Availability;
};