const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Vulnerable route using GET method
app.get('/login', (req, res) => {
   const { username, password } = req.query;

   const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' `;       

  // const query = `SELECT * FROM users WHERE username = 'admin' OR password = '' OR '1'='1' `;

  //  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Server error');
      return;
    }
    if (result.length > 0) {
      res.send('Login successful');
    } else {
      res.send('Invalid credentials');
    }
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
