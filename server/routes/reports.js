const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');

const pad2 = (value) => String(value).padStart(2, '0');

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const getWeekRange = (dateString) => {
  const targetDate = new Date(dateString);
  const sunday = new Date(targetDate);
  sunday.setDate(targetDate.getDate() - targetDate.getDay());

  const weekDates = [];
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    weekDates.push(formatDate(date));
  }

  return {
    weekStart: weekDates[0],
    weekEnd: weekDates[6],
    weekDates,
  };
};

const getDayType = (dateString) => {
  const dayOfWeek = new Date(dateString).getDay();
  if (dayOfWeek === 0) return 3;
  if (dayOfWeek === 6) return 2;
  return 1;
};

const getMapKey = (parts) => parts.join('|');

const buildLookup = (rows, keyFn) => {
  return rows.reduce((lookup, row) => {
    const key = keyFn(row);
    if (!lookup[key]) lookup[key] = [];
    lookup[key].push(row);
    return lookup;
  }, {});
};

const findFirst = (lookup, key) => (lookup[key] && lookup[key][0]) || null;

const determineStatus = ({
  actsAsSub,
  isAssigned,
  availability,
  coveredBySub,
  missingAvailabilityStatus = '-',
}) => {
  if (actsAsSub) return 'Present';
  if (!isAssigned) return 'No schedule';

  if (availability) {
    if (availability.status === 'Unavailable' && availability.approval_status === 'Approved') {
      return 'On Leave';
    }

    if (availability.status === 'Available') {
      return availability.decl_time > availability.start_time ? 'Late' : 'Present';
    }

    return 'Absent';
  }

  if (coveredBySub) return 'Absent';
  return missingAvailabilityStatus;
};

router.get('/', async (req, res) => {
  try {
    const todayStr = formatDate(new Date());
    const targetDateStr = req.query.date || todayStr;
    const { weekStart, weekEnd, weekDates } = getWeekRange(targetDateStr);

    const queryStart = weekStart < todayStr ? weekStart : todayStr;
    const queryEnd = weekEnd > todayStr ? weekEnd : todayStr;

    // Fetch the raw data
    const [allDJs] = await sequelize.query(`
      SELECT d.dj_ID, d.stage_name, CONCAT(a.first_name, ' ', a.last_name) AS real_name 
      FROM dj d JOIN admin a ON d.admin_ID = a.admin_ID
    `);
    
    const [assignments] = await sequelize.query(`
      SELECT pda.dj_ID, ps.schedule_day_type_ID, ps.start_time 
      FROM program_dj_assignment pda 
      JOIN program_schedule ps ON pda.program_ID = ps.program_ID
    `);

    const [availabilities] = await sequelize.query(`
      SELECT da.broadcast_date, pda.dj_ID, da.status, da.approval_status, TIME(da.declared_at) as decl_time, ps.start_time
      FROM dj_availability da 
      JOIN program_dj_assignment pda ON da.assignment_ID = pda.assignment_ID
      JOIN program_schedule ps ON pda.program_ID = ps.program_ID
      WHERE da.broadcast_date BETWEEN :start AND :end
    `, { replacements: { start: queryStart, end: queryEnd } });

    const [substitutions] = await sequelize.query(`
      SELECT pda.dj_ID AS original_dj_ID, s.substitute_dj_ID, s.broadcast_date, s.status 
      FROM substitutions s
      JOIN program_dj_assignment pda ON s.assignment_ID = pda.assignment_ID
      WHERE s.broadcast_date BETWEEN :start AND :end
    `, { replacements: { start: queryStart, end: queryEnd } });

    const assignmentLookup = buildLookup(assignments, (row) =>
      getMapKey([row.dj_ID, row.schedule_day_type_ID])
    );

    const availabilityLookup = buildLookup(availabilities, (row) =>
      getMapKey([row.dj_ID, row.broadcast_date])
    );

    const originalSubLookup = buildLookup(substitutions, (row) =>
      getMapKey([row.original_dj_ID, row.broadcast_date, row.status])
    );

    const substituteSubLookup = buildLookup(substitutions, (row) =>
      getMapKey([row.substitute_dj_ID, row.broadcast_date, row.status])
    );

    const presentToday = [];
    const lateToday = [];
    const absentToday = [];
    const onLeaveToday = [];

    allDJs.forEach((dj) => {
      dj.weekly_status = {};

      weekDates.forEach((dateStr) => {
        const dayTypeId = getDayType(dateStr);
        const isAssigned = Boolean(
          findFirst(assignmentLookup, getMapKey([dj.dj_ID, dayTypeId]))
        );
        const availability = findFirst(
          availabilityLookup,
          getMapKey([dj.dj_ID, dateStr])
        );
        const coveredBySub = Boolean(
          findFirst(
            originalSubLookup,
            getMapKey([dj.dj_ID, dateStr, 'Assigned'])
          )
        );
        const actsAsSub = Boolean(
          findFirst(
            substituteSubLookup,
            getMapKey([dj.dj_ID, dateStr, 'Assigned'])
          )
        );

        dj.weekly_status[dateStr] = determineStatus({
          actsAsSub,
          isAssigned,
          availability,
          coveredBySub,
          missingAvailabilityStatus: '-',
        });
      });

      const todayDayType = getDayType(todayStr);
      const assignedToday = Boolean(
        findFirst(assignmentLookup, getMapKey([dj.dj_ID, todayDayType]))
      );
      const availabilityToday = findFirst(
        availabilityLookup,
        getMapKey([dj.dj_ID, todayStr])
      );
      const coveredToday = Boolean(
        findFirst(
          originalSubLookup,
          getMapKey([dj.dj_ID, todayStr, 'Assigned'])
        )
      );
      const subbedToday = Boolean(
        findFirst(
          substituteSubLookup,
          getMapKey([dj.dj_ID, todayStr, 'Assigned'])
        )
      );

      const statusToday = determineStatus({
        actsAsSub: subbedToday,
        isAssigned: assignedToday,
        availability: availabilityToday,
        coveredBySub: coveredToday,
        missingAvailabilityStatus: 'Absent',
      });

      if (statusToday === 'Present') presentToday.push(dj);
      if (statusToday === 'Late') lateToday.push(dj);
      if (statusToday === 'Absent') absentToday.push(dj);
      if (statusToday === 'On Leave') onLeaveToday.push(dj);
    });

    res.json({
      present: presentToday,
      late: lateToday,
      absent: absentToday,
      onLeave: onLeaveToday,
      tableData: allDJs 
    });

  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: "Failed to calculate weekly matrix" });
  }
});

module.exports = router;