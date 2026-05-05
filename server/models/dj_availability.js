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
      // define association here
    }
  }
  DJ_Availability.init({
    availability_ID: DataTypes.INTEGER,
    assignment_ID: DataTypes.INTEGER,
    broadcast_date: DataTypes.DATEONLY,
    status: DataTypes.ENUM,
    confirmed_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DJ_Availability',
  });
  return DJ_Availability;
};