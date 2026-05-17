'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Program_DJ_Assignment', [
      {
        dj_ID: 1,
        program_ID: 2,
        effective_start_date: '2026-01-15 22:49:41',
        effective_end_date: null,
        assigned_by_admin_ID: 1
      },
      {
        dj_ID: 4,
        program_ID: 3,
        effective_start_date: '2026-01-15 22:50:11',
        effective_end_date: null,
        assigned_by_admin_ID: 1
      },
      {
        dj_ID: 3,
        program_ID: 4,
        effective_start_date: '2026-01-15 22:51:19',
        effective_end_date: null,
        assigned_by_admin_ID: 1
      },
      {
        dj_ID: 2,
        program_ID: 5,
        effective_start_date: '2026-01-15 22:53:17',
        effective_end_date: null,
        assigned_by_admin_ID: 1
      },
      {
        dj_ID: 4,
        program_ID: 5,
        effective_start_date: '2026-01-15 22:53:39',
        effective_end_date: null,
        assigned_by_admin_ID: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Program_DJ_Assignment', null, {});
  }
};
