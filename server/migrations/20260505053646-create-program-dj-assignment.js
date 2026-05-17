'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Program_DJ_Assignment', {
      assignment_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      dj_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'DJ',
          key: 'dj_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      program_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Program',
          key: 'program_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      effective_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      effective_end_date: {
        type: Sequelize.DATE
      },
      assigned_by_admin_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Admin',
          key: 'admin_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE Program_DJ_Assignment
      ADD CONSTRAINT check_assignment_end_date
      CHECK (effective_end_date IS NULL OR effective_end_date > effective_start_date)
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Program_DJ_Assignment');
  }
};