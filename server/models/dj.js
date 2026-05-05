'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DJ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DJ.init({
    dj_ID: DataTypes.INTEGER,
    admin_ID: DataTypes.INTEGER,
    stage_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DJ',
  });
  return DJ;
};