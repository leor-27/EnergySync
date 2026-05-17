'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DJ_Availability', [
      {
        assignment_ID: 1,
        broadcast_date: '2026-01-16',
        remarks: null,
        declared_at: '2026-01-16 06:37:12',
        status: 'Available',
        approval_status: null,
        reviewed_at: null,
        reviewed_by_admin_ID: null
      },
      {
        assignment_ID: 2,
        broadcast_date: '2026-01-16',
        remarks: 'Sick',
        declared_at: '2026-01-16 08:16:15',
        status: 'Unavailable',
        approval_status: 'Approved',
        reviewed_at: '2026-01-16 08:45:22',
        reviewed_by_admin_ID: 1
      },
      {
        assignment_ID: 3,
        broadcast_date: '2026-01-16',
        remarks: null,
        declared_at: '2026-01-16 11:11:45',
        status: 'Available',
        approval_status: null,
        reviewed_at: null,
        reviewed_by_admin_ID: null
      },
      {
        assignment_ID: 4,
        broadcast_date: '2026-01-16',
        remarks: null,
        declared_at: '2026-01-16 14:00:00',
        status: 'Available',
        approval_status: null,
        reviewed_at: null,
        reviewed_by_admin_ID: null
      },
      {
        assignment_ID: 3,
        broadcast_date: '2026-01-17',
        remarks: 'Don’t wanna go to work',
        declared_at: '2026-01-17 07:31:28',
        status: 'Unavailable',
        approval_status: 'Rejected',
        reviewed_at: '2026-01-17 08:02:11',
        reviewed_by_admin_ID: 1
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DJ_Availability', null, {});
  }
};
