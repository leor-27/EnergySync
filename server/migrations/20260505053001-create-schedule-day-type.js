'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedule_Day_Type', {
      schedule_day_type_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      schedule_day_type: {
        type: Sequelize.ENUM('WEEKDAYS', 'SATURDAY', 'SUNDAY'),
        allowNull: false,
        unique: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Schedule_Day_Type');
  }
};