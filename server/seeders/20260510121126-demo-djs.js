'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DJ', [
      {
        admin_ID: 1,
        stage_name: 'DJ MAKISIG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 2,
        stage_name: 'DJ APPLE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 3,
        stage_name: 'PAPA GATS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 4,
        stage_name: 'DJ BARBIE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 5,
        stage_name: 'KUYA BOK',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DJ', null, {});
  }
};
