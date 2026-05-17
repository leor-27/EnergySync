'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admin', [
      {
        username: null,
        email: 'vinasruel@gmail.com',
        first_name: null,
        last_name: null,
        password_hash: null,
        is_initialized: 0,
        reset_token_hash: null,
        reset_token_expires: null,
        image_path: null,
        role_type: 'Superadmin'
      },
      {
        username: null,
        email: 'laarnisandia@gmail.com',
        first_name: null,
        last_name: null,
        password_hash: null,
        is_initialized: 0,
        reset_token_hash: null,
        reset_token_expires: null,
        image_path: null,
        role_type: 'Admin'
      },
      {
        username: null,
        email: 'jordanlanuzga@gmail.com',
        first_name: null,
        last_name: null,
        password_hash: null,
        is_initialized: 0,
        reset_token_hash: null,
        reset_token_expires: null,
        image_path: null,
        role_type: 'Admin'
      },
      {
        username: null,
        email: 'barbiebongalbal@gmail.com',
        first_name: null,
        last_name: null,
        password_hash: null,
        is_initialized: 0,
        reset_token_hash: null,
        reset_token_expires: null,
        image_path: null,
        role_type: 'Admin'
      },
      {
        username: null,
        email: 'bokmillare@gmail.com',
        first_name: null,
        last_name: null,
        password_hash: null,
        is_initialized: 0,
        reset_token_hash: null,
        reset_token_expires: null,
        image_path: null,
        role_type: 'Admin'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admin', null, {});
  }
};