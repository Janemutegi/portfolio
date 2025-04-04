// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve your HTML/CSS files

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kelvin2024@123*',
  database: 'porfolio',
  port: 3308
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint for form submission
app.post('/your_form_page.html', (req, res) => {
  const { fullname, email, phone, date, gender, program_status, message } = req.body;
  
  const query = `INSERT INTO myportfolio 
    (fullname, email, phone, contact_date, gender, program_specialization, message) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
  connection.query(
    query, 
    [fullname, email, phone, date, department, program_status, message],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ error: 'Failed to submit form' });
      }
      return res.status(200).json({ message: 'Form submitted successfully' });
    }
  );
});

const PORT = 3308;
app.listen(PORT, () => {
  console.log(`Server running on port ${3308}`);
});