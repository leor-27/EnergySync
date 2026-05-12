'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Notifications', [
      {
        admin_ID: 1,
        message: 'You assigned yourself to host Harambogan…',
        is_read: 1,
        notified_at: '2026-01-15 22:49:41',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 4,
        message: 'DJ Makisig assigned you to host…',
        is_read: 1,
        notified_at: '2026-01-15 22:50:11',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 3,
        message: 'DJ Makisig assigned you to host…',
        is_read: 1,
        notified_at: '2026-01-15 22:51:19',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 1,
        message: 'You confirmed your attendance…',
        is_read: 1,
        notified_at: '2026-01-16 06:11:31',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 1,
        message: 'Papa Gats confirmed his attendance…',
        is_read: 1,
        notified_at: '2026-01-16 07:02:51',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 1,
        message: 'Admin Ruel Viñas assigned you as a substitute DJ for “LOVELINES“ at 12:00 PM - 02:00 PM today, April 22, 2026',
        is_read: 0,
        notified_at: '2026-04-22 21:36:21',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 1,
        message: 'Admin Ruel Viñas assigned you as a substitute DJ for “ENERGY SA HAPON“ at 03:00 PM - 05:00 PM today, April 22, 2026',
        is_read: 0,
        notified_at: '2026-04-22 21:39:59',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 4,
        message: 'Admin Ruel Viñas assigned you as a substitute DJ for “LOVELINES“ at 12:00 PM - 02:00 PM today, April 22, 2026',
        is_read: 0,
        notified_at: '2026-04-22 21:47:38',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 1,
        message: 'DJ BARBIE has rejected your request to become a Substitute for “LOVELINES“ at 12:00 PM - 02:00 PM today, April 22, 2026',
        is_read: 0,
        notified_at: '2026-04-22 22:05:21',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 2,
        message: 'Admin Ruel Viñas assigned you as a substitute DJ for “HARAMBOGAN SA RADYO“ at 07:00 AM - 09:00 AM today, April 23, 2026',
        is_read: 0,
        notified_at: '2026-04-23 10:57:29',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 2,
        message: 'Admin Ruel Viñas assigned you as a substitute DJ for “HARAMBOGAN SA RADYO“ at 07:00 AM - 09:00 AM today, May 04, 2026',
        is_read: 0,
        notified_at: '2026-05-04 19:06:35',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        admin_ID: 1,
        message: 'DJ APPLE has accepted your request to become a Substitute for “HARAMBOGAN SA RADYO“ at 07:00 AM - 09:00 AM today, May 04, 2026',
        is_read: 0,
        notified_at: '2026-05-04 19:12:43',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
