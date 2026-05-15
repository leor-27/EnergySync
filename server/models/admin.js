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
      Admin.hasOne(models.DJ, {
    foreignKey: "admin_ID"
  });
    }
  }
  Admin.init({
    admin_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
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
    role_type: DataTypes.ENUM('Superadmin', 'Admin')
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admin',
    timestamps: false
  });
  return Admin;
};