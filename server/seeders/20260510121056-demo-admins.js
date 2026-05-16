'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admin', [
      {
        username: 'djmakisig',
        email: 'vinasruel@gmail.com',
        first_name: 'Ruel',
        last_name: 'Viñas',
        password_hash: '$2y$12$QWghnmNek1Cle7tRh...',
        is_initialized: 1,
        invite_token_hash: '33a5d365fe182f0390e746a63661...',
        invite_token_expires: '2026-01-01 10:43:44',
        reset_token_hash: 'B90b73b1b6f48bd99fmswqlae12...',
        reset_token_expires: '2026-01-07 12:14:14',
        image_path: null,
        role_type: 'Superadmin'
      },
      {
        username: 'djapple',
        email: 'laarnisandia@gmail.com',
        first_name: 'Laarni',
        last_name: 'Sandia',
        password_hash: '$2y$12$bC6dE8fGhJkLmN0pQ...',
        is_initialized: 1,
        invite_token_hash: '4e7a2c9d1f36b8a0c5e19d73f264...',
        invite_token_expires: '2026-01-14 14:13:04',
        reset_token_hash: null,
        reset_token_expires: null,
        image_path: null,
        role_type: 'Admin'
      },
      {
        username: 'papagats',
        email: 'jordanlanuzga@gmail.com',
        first_name: 'John Jordan',
        last_name: 'Lanuzga',
        password_hash: '$2y$12$rStUvWxYzAbCdEfGhl...',
        is_initialized: 1,
        invite_token_hash: 'a9c4e7f21d6b3058f3e1a2d9c764...',
        invite_token_expires: '2026-01-15 18:02:27',
        reset_token_hash: null,
        reset_token_expires: null,
        image_path: null,
        role_type: 'Admin'
      },
      {
        username: 'djbarbie',
        email: 'barbiebongalbal@gmail.com',
        first_name: 'NE-A',
        last_name: 'Bongalbal',
        password_hash: '$2y$12$Mn8BvC5xZqW3sD7fG...',
        is_initialized: 1,
        invite_token_hash: '5d1e7c9a3f82b406e1a4d9c73f28...',
        invite_token_expires: '2026-01-15 21:54:30',
        reset_token_hash: null,
        reset_token_expires: null,
        image_path: null,
        role_type: 'Admin'
      },
      {
        username: 'kuyabok',
        email: 'bokmillare@gmail.com',
        first_name: 'Bok',
        last_name: 'Millare',
        password_hash: '$2y$12$AjHiJlajsA2u0ahjaA...',
        is_initialized: 1,
        invite_token_hash: '9c2b9z5h1g97f72395m1j2q64k10...',
        invite_token_expires: '2026-01-15 23:21:11',
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