'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Program_Schedule', {
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
          model: 'Program',
          key: 'program_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      schedule_day_type_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Schedule_Day_Type',
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
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      effective_end_date: {
        type: Sequelize.DATE
      },
      scheduled_by_admin_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Admin',
          key: 'admin_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    }, {
    uniqueKeys: {
        unique_schedule: {
          fields: ['program_ID', 'schedule_day_type_ID', 'effective_start_date']
      }
    }
  });
    await queryInterface.sequelize.query(`
      ALTER TABLE Program_Schedule
      ADD CONSTRAINT check_schedule_time
      CHECK (end_time > start_time)
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE Program_Schedule
      ADD CONSTRAINT check_program_schedule_end_date
      CHECK (
        effective_end_date IS NULL OR
        effective_end_date > effective_start_date
      )
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Program_Schedule');
  }
};