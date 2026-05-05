'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    admin_ID: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password_hash: DataTypes.CHAR,
    is_initialized: DataTypes.BOOLEAN,
    invite_token_hash: DataTypes.CHAR,
    invite_token_expires: DataTypes.DATE,
    reset_token_hash: DataTypes.CHAR,
    reset_token_expires: DataTypes.DATE,
    image_path: DataTypes.STRING,
    phone_number: DataTypes.CHAR,
    role_type: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};