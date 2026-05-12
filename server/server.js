// server/server.js
const express = require('express');
const cors = require('cors');
const db = require('./models');

const adminRouter = require('./routes/admins');
const djAvailabilityRouter = require('./routes/dj_availabilities');
const djRouter = require('./routes/djs');
const notificationRouter = require('./routes/notifications');
const programDjAssignmentRouter = require('./routes/program_dj_assignments');
const programScheduleRouter = require('./routes/program_schedules');
const programRouter = require('./routes/programs');
const scheduleDayTypeRouter = require('./routes/schedule_day_types');
const substitutionRouter = require('./routes/substitutions');
const activityLogRouter = require('./routes/activity_logs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/admins', adminRouter);
app.use('/api/dj_availabilities', djAvailabilityRouter);
app.use('/api/djs', djRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/program_dj_assignments', programDjAssignmentRouter);
app.use('/api/program_schedules', programScheduleRouter);
app.use('/api/programs', programRouter);
app.use('/api/schedule_day_types', scheduleDayTypeRouter);
app.use('/api/substitutions', substitutionRouter);
app.use('/api/activity_logs', activityLogRouter);

db.sequelize.authenticate().then(() => {
  console.log('Database connected!');
  app.listen(5000, () => console.log('Server running on port 5000'));
});

// Start server after Sequelize initialization
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected via Sequelize.');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });