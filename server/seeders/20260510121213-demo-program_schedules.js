'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Program_Schedule', [
      {
        program_ID: 1,
        schedule_day_type_ID: 1,
        start_time: '00:00:00',
        end_time: '05:00:00',
        effective_start_date: '2026-01-15 22:44:41',
        effective_end_date: null,
        scheduled_by_admin_ID: 1
      },
      {
        program_ID: 1,
        schedule_day_type_ID: 2,
        start_time: '00:00:00',
        end_time: '05:00:00',
        effective_start_date: '2026-01-15 22:44:59',
        effective_end_date: null,
        scheduled_by_admin_ID: 1
      },
      {
        program_ID: 2,
        schedule_day_type_ID: 1,
        start_time: '07:00:00',
        end_time: '09:00:00',
        effective_start_date: '2026-01-15 22:49:52',
        effective_end_date: null,
        scheduled_by_admin_ID: 1
      },
      {
        program_ID: 3,
        schedule_day_type_ID: 1,
        start_time: '09:00:00',
        end_time: '11:00:00',
        effective_start_date: '2026-01-15 22:50:32',
        effective_end_date: null,
        scheduled_by_admin_ID: 1
      },
      {
        program_ID: 4,
        schedule_day_type_ID: 1,
        start_time: '12:00:00',
        end_time: '14:00:00',
        effective_start_date: '2026-01-15 22:52:39',
        effective_end_date: null,
        scheduled_by_admin_ID: 1
      },
      {
        program_ID: 5,
        schedule_day_type_ID: 1,
        start_time: '15:00:00',
        end_time: '17:00:00',
        effective_start_date: '2026-01-15 22:53:25',
        effective_end_date: null,
        scheduled_by_admin_ID: 1
      },
      {
        program_ID: 5,
        schedule_day_type_ID: 2,
        start_time: '15:00:00',
        end_time: '17:00:00',
        effective_start_date: '2026-01-15 22:53:29',
        effective_end_date: null,
        scheduled_by_admin_ID: 1
      },
      {
        program_ID: 5,
        schedule_day_type_ID: 3,
        start_time: '15:00:00',
        end_time: '17:00:00',
        effective_start_date: '2026-01-15 22:53:33',
        effective_end_date: '2026-01-20 05:12:11',
        scheduled_by_admin_ID: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Program_Schedule', null, {});
  }
};
