'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('activity_logs', [
      {
        log_message: 'Substitution ID 8 changed from Pending to Rejected',
        created_at: '2026-05-03 08:46:26',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        log_message: 'Substitution ID 9 changed from Pending to Accepted, and notification was sent to Admin ID 1',
        created_at: '2026-05-04 11:12:43',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('activity_logs', null, {});
  }
};
