'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications.init({
    notification_ID: DataTypes.INTEGER,
    admin_ID: DataTypes.INTEGER,
    message: DataTypes.STRING,
    is_read: DataTypes.BOOLEAN,
    notified_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};