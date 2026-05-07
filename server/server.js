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

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
// add routers

db.sequelize.authenticate().then(() => {
  console.log('Database connected!');
  app.listen(5000, () => console.log('Server running on port 5000'));
});