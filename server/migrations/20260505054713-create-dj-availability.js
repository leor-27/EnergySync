'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DJ_Availabilities', {
      availability_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      assignment_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Program_DJ_Assignments',
          key: 'assignment_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      broadcast_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Available', 'Unavailable'),
        allowNull: false
      },
      confirmed_at: {
        type: Sequelize.DATE,
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
    }, {
    uniqueKeys: {
        unique_availability: {
          fields: ['assignment_ID', 'broadcast_date']
      }
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DJ_Availabilities');
  }
};