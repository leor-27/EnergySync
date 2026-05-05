'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Program_Schedules', {
      schedule_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      program_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Programs',
          key: 'program_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      schedule_day_type_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Schedule_Day_Types',
          key: 'schedule_day_type_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      effective_start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      effective_end_date: {
        type: Sequelize.DATE
      },
      scheduled_by_admin_ID: {
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
    }, {
    uniqueKeys: {
        unique_schedule: {
          fields: ['program_ID', 'schedule_day_type_ID', 'effective_start_date']
      }
    }
  });
    /* UNIQUE(program_ID, schedule_day_type_ID, effective_start_date)*/
    await queryInterface.sequelize.query(`
      ALTER TABLE Program_DJ_Assignments
      ADD CONSTRAINT check_schedule_end_date
      CHECK (effective_end_date IS NULL OR effective_end_date > effective_start_date)
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Program_Schedules');
  }
};