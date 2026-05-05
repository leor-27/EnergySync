'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Substitutions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Substitutions.init({
    substitution_ID: DataTypes.INTEGER,
    assignment_ID: DataTypes.INTEGER,
    substitute_dj_ID: DataTypes.INTEGER,
    status: DataTypes.ENUM,
    broadcast_date: DataTypes.DATEONLY,
    assigned_at: DataTypes.DATE,
    assigned_by_admin_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Substitutions',
  });
  return Substitutions;
};