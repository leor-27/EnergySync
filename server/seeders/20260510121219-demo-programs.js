'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Program', [
      {
        program_name: 'GOOD MORNING ENERGY',
        program_type: 'MUSIC ONLY',
        description: 'An all-night musical…',
        created_at: '2026-01-15 22:12:15',
        added_by_admin_ID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        program_name: 'HARAMBOGAN SA RADYO',
        program_type: 'WITH DJ/HOST',
        description: 'A vibrant and entertaining…',
        created_at: '2026-01-15 22:17:11',
        added_by_admin_ID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        program_name: 'KUMPLETOS REKADOS',
        program_type: 'WITH DJ/HOST',
        description: 'A dynamic noontime…',
        created_at: '2026-01-15 22:31:19',
        added_by_admin_ID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        program_name: 'LOVELINES',
        program_type: 'WITH DJ/HOST',
        description: 'A dedicated space…',
        created_at: '2026-01-15 22:37:12',
        added_by_admin_ID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        program_name: 'ENERGY SA HAPON',
        program_type: 'WITH DJ/HOST',
        description: 'Power through your…',
        created_at: '2026-01-15 22:39:11',
        added_by_admin_ID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        program_name: 'ENERGY SA GABI',
        program_type: 'WITH DJ/HOST',
        description: 'Unwind and relax as…',
        created_at: '2026-01-18 11:12:34',
        added_by_admin_ID: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Program', null, {});
  }
};
