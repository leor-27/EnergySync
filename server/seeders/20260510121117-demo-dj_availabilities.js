'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DJ_Availability', [
      {
        assignment_ID: 1,
        broadcast_date: '2026-01-16',
        status: 'Available',
        confirmed_at: '2026-01-16 06:37:12'
      },
      {
        assignment_ID: 2,
        broadcast_date: '2026-01-16',
        status: 'Unavailable',
        confirmed_at: '2026-01-16 08:16:15'
      },
      {
        assignment_ID: 3,
        broadcast_date: '2026-01-16',
        status: 'Available',
        confirmed_at: '2026-01-16 11:11:45'
      },
      {
        assignment_ID: 4,
        broadcast_date: '2026-01-16',
        status: 'Available',
        confirmed_at: '2026-01-16 14:00:00'
      },
      {
        assignment_ID: 3,
        broadcast_date: '2026-01-17',
        status: 'Unavailable',
        confirmed_at: '2026-01-17 07:31:28'
      },
      {
        assignment_ID: 1,
        broadcast_date: '2026-04-23',
        status: 'Unavailable',
        confirmed_at: '2026-04-23 06:37:12'
      },
      {
        assignment_ID: 1,
        broadcast_date: '2026-05-03',
        status: 'Unavailable',
        confirmed_at: '2026-05-03 16:43:29'
      },
      {
        assignment_ID: 1,
        broadcast_date: '2026-05-04',
        status: 'Unavailable',
        confirmed_at: '2026-05-04 19:01:20'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DJ_Availability', null, {});
  }
};
