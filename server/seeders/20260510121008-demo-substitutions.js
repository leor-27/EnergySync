'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Substitutions', [
      {
        assignment_ID: 2,
        substitute_dj_ID: 3,
        status: 'Assigned',
        broadcast_date: '2026-01-16',
        assigned_at: '2026-01-16 10:12:27',
        assigned_by_admin_ID: 1
      },
      {
        assignment_ID: 3,
        substitute_dj_ID: 4,
        status: 'Cancelled',
        broadcast_date: '2026-01-17',
        assigned_at: '2026-01-17 08:29:27',
        assigned_by_admin_ID: 1
      },
      {
        assignment_ID: 3,
        substitute_dj_ID: 1,
        status: 'Assigned',
        broadcast_date: '2026-04-22',
        assigned_at: '2026-04-22 21:36:20',
        assigned_by_admin_ID: 1
      },
      {
        assignment_ID: 3,
        substitute_dj_ID: 4,
        status: 'Assigned',
        broadcast_date: '2026-04-22',
        assigned_at: '2026-04-22 21:47:38',
        assigned_by_admin_ID: 1
      },
      {
        assignment_ID: 1,
        substitute_dj_ID: 2,
        status: 'Assigned',
        broadcast_date: '2026-04-23',
        assigned_at: '2026-04-23 10:12:27',
        assigned_by_admin_ID: 1
      },
      {
        assignment_ID: 1,
        substitute_dj_ID: 2,
        status: 'Cancelled',
        broadcast_date: '2026-04-24',
        assigned_at: '2026-04-24 10:57:29',
        assigned_by_admin_ID: 1
      },
      {
        assignment_ID: 1,
        substitute_dj_ID: 2,
        status: 'Cancelled',
        broadcast_date: '2026-05-03',
        assigned_at: '2026-05-03 16:45:12',
        assigned_by_admin_ID: 1
      },
      {
        assignment_ID: 1,
        substitute_dj_ID: 2,
        status: 'Cancelled',
        broadcast_date: '2026-05-04',
        assigned_at: '2026-05-04 19:06:35',
        assigned_by_admin_ID: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Substitutions', null, {});
  }
};
