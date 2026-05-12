'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Schedule_Day_Type', [
      {
        schedule_day_type: 'WEEKDAYS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schedule_day_type: 'SATURDAY',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schedule_day_type: 'SUNDAY',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedule_Day_Type', null, {});
  }
};
