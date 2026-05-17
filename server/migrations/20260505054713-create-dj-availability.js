'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DJ_Availability', {
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
          model: 'Program_DJ_Assignment',
          key: 'assignment_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      broadcast_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      remarks: {
        type: Sequelize.STRING(500)
      },
      declared_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      status: {
        type: Sequelize.ENUM('Available', 'Unavailable'),
        allowNull: false
      },
      approval_status: {
        type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected'),
        defaultValue: 'Pending'
      },
      reviewed_at: {
        type: Sequelize.DATE
      },
      reviewed_by_admin_ID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Admin',
          key: 'admin_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('DJ_Availability');
  }
};