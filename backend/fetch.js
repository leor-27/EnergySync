const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 3000;

const connection = require('./db'); 

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Define a GET route for the homepage
// app.get('/', (req, res) => {
//   res.send('Hello from Express.js Server!');
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

// Define a POST route for an API endpoint
app.post('/api/data', (req, res) => {
  const receivedData = req.body;
  console.log('Received data:', receivedData);
  res.json({ message: 'Data received successfully!', data: receivedData });
}); // for testing

// Define a GET route to fetch data from MySQL
// app.get('/admins', (req, res) => {
//   const query = 'SELECT * FROM Admin';
//   connection.query(query, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// app.get('/djs', (req, res) => {
//   const query = 'SELECT * FROM DJ';
//   connection.query(query, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// app.get('/programs', (req, res) => {
//   const query = 'SELECT * FROM Program';
//   connection.query(query, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// app.get('/daytypes', (req, res) => {
//   const query = 'SELECT * FROM Schedule_Day_Type';
//   connection.query(query, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// app.get('/notifications', (req, res) => {
//   const query = 'SELECT * FROM Notifications';
//   connection.query(query, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// app.get('/programdjassignments', (req, res) => {
//   const query = 'SELECT * FROM Program_DJ_Assignment';
//   connection.query(query, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// app.get('/programschedules', (req, res) => {
//   const query = 'SELECT * FROM Program_Schedule';
//   connection.query(query, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// app.get('/djavailabilities', (req, res) => {
//   const query = 'SELECT * FROM DJ_Availability';
//   connection.query(query, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// app.get('/substitutions', (req, res) => {
//   const query = 'SELECT * FROM Substitutions';
//   connection.query(query, (err, results) => {
//     if (err) return res.status(500).send(err);
//     res.json(results);
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});