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
          model: 'Program_DJ_Assignment',
          key: 'assignment_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      substitute_dj_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'DJ',
          key: 'dj_ID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      status: {
        type: Sequelize.ENUM('Assigned', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Assigned'
      },
      broadcast_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      assigned_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
       }, {
      uniqueKeys: {
        unique_substitution: {
          fields: [
            'assignment_ID',
            'substitute_dj_ID',
            'broadcast_date'
          ]
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Substitutions');
  }
};