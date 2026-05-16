'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Schedule_Day_Type', [
      {
        schedule_day_type: 'WEEKDAYS'
      },
      {
        schedule_day_type: 'SATURDAY'
      },
      {
        schedule_day_type: 'SUNDAY'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedule_Day_Type', null, {});
  }
};
