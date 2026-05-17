'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DJ', [
      {
        admin_ID: 1,
        stage_name: 'DJ MAKISIG'
      },
      {
        admin_ID: 2,
        stage_name: 'DJ APPLE'
      },
      {
        admin_ID: 3,
        stage_name: 'PAPA GATS'
      },
      {
        admin_ID: 4,
        stage_name: 'DJ BARBIE'
      },
      {
        admin_ID: 5,
        stage_name: 'KUYA BOK'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DJ', null, {});
  }
};
