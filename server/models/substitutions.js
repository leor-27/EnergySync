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
       Substitutions.belongsTo(models.Program_DJ_Assignment, {
    foreignKey: "assignment_ID"
  });

  Substitutions.belongsTo(models.DJ, {
    foreignKey: "substitute_dj_ID"
  });

  Substitutions.belongsTo(models.Admin, {
    foreignKey: "assigned_by_admin_ID"
  });
    }
  }
  Substitutions.init({
    substitution_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    assignment_ID: DataTypes.INTEGER,
    substitute_dj_ID: DataTypes.INTEGER,
    status: DataTypes.ENUM('Assigned', 'Cancelled'),
    broadcast_date: DataTypes.DATEONLY,
    assigned_at: DataTypes.DATE,
    assigned_by_admin_ID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Substitutions',
    tableName: 'Substitutions',
    timestamps: false
  });
  return Substitutions;
};