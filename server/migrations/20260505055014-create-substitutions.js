'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // fix here
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Substitutions', {
      substitution_ID: {
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
      substitute_dj_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'DJs',
          key: 'dj_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      status: {
        type: Sequelize.ENUM('Accepted', 'Pending', 'Rejected'),
        allowNull: false
      },
      broadcast_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      assigned_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      assigned_by_admin_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Admins',
          key: 'admin_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('Substitutions');
  }
};