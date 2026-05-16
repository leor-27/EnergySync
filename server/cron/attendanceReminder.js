const cron = require("node-cron");

const db = require("../models");

cron.schedule(
  "0 0 * * *",
  async () => {

    try {

      console.log(
        "Sending reminders..."
      );

      const [rows] =
      await db.query(`

        SELECT
          a.admin_ID,
          dj.stage_name,
          p.program_name

        FROM Program_DJ_Assignment pda

        INNER JOIN DJ dj
          ON dj.dj_ID = pda.dj_ID

        INNER JOIN Admin a
          ON a.admin_ID = dj.admin_ID

        INNER JOIN Program p
          ON p.program_ID = pda.program_ID

        LEFT JOIN DJ_Availability da
          ON da.assignment_ID =
             pda.assignment_ID
          AND da.broadcast_date =
              CURDATE()

        WHERE da.availability_ID IS NULL

      `);

      for (const row of rows) {

        await db.query(`

          INSERT INTO Notifications (

            admin_ID,
            message,
            is_read,
            notified_at

          )

          VALUES (

            ?,

            ?,

            0,

            NOW()

          )

        `, [

          row.admin_ID,

          `Reminder: Please confirm your attendance for ${row.program_name}.`

        ]);

      }

    } catch (err) {

      console.error(err);

    }

  }
);