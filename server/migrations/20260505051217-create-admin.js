'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      admin_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(30),
        unique: true
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      first_name: {
        type: Sequelize.STRING(50)
      },
      last_name: {
        type: Sequelize.STRING(50)
      },
      password_hash: {
        type: Sequelize.CHAR(60)
      },
      is_initialized: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: false
      },
      invite_token_hash: {
        type: Sequelize.CHAR(64),
        unique: true
      },
      invite_token_expires: {
        type: Sequelize.DATE
      },
      reset_token_hash: {
        type: Sequelize.CHAR(64),
        unique: true
      },
      reset_token_expires: {
        type: Sequelize.DATE
      },
      image_path: {
        type: Sequelize.STRING(150)
      },
      phone_number: {
        type: Sequelize.CHAR(16),
        unique: true
      },
      role_type: {
        type: Sequelize.ENUM('Superadmin', 'Admin'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Admins');
  }
};