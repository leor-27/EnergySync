'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Program.init({
    program_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    program_name: DataTypes.STRING,
    program_type: DataTypes.ENUM('MUSIC ONLY', 'WITH DJ/HOST'),
    description: DataTypes.STRING,
    created_at: DataTypes.DATE,
    added_by_admin_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Program',
    tableName: 'Program'
  });
  return Program;
};