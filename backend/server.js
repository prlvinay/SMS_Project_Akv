const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors=require('cors');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'vinay',
});

db.connect((err)=>{
  if(err){
    console.log("Error connecting to DB",err);
    process.exit(1);
  }
  console.log("DB Connected...");
})


const createuser=`
CREATE TABLE IF NOT EXISTS users(
id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    status INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );
    `;

db.query(createuser, (err) => {
    if (err) {
        console.error('Error table not created', err);
    } else {
        console.log('table created.');
    }
});

app.post('/user/create', async (req, res) => {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please Enter all Details.' });
  }

  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const query = 'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)';
      db.query(query, [username, email, phone, hashedPassword], (err, results) => {
          if (err) {
              if (err.code === 'ER_DUP_ENTRY') {
                  return res.status(400).json({ message: 'Username, email, or phone already exists.' });
              }
              console.error('Error creating user:', err);
              return res.status(500).json({ message: 'Internal server error.' });
          }
          res.status(201).json({
              id: results.insertId,
              username,
              email,
              phone,
              status: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
          });
      });
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Internal server error.' });
  }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access token required' });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
    });
  };



app.post('/user/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
      if (err) {
          console.error('Error fetching user:', err);
          return res.status(500).json({ message: 'Internal server error.' });
      }

      if (results.length === 0) {
          return res.status(404).json({ message: 'User not found.' });
      }

      const user = results[0];
      // Check if the user is active
    //   if (user.status !== 1) {
    //       return res.status(403).json({ message: 'User is not active. Please contact support.' });
    //   }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials.' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
          expiresIn: '1h',
      });

      res.status(200).json({
          message: 'Login successful.',
          token,
      });
  });
});

app.get('/dashboard', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const query = 'SELECT id, username, email, phone, status, createdAt, updatedAt FROM users WHERE id = ?';
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user details:', err);
        return res.status(500).json({ message: 'Internal server error.' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      res.status(200).json(results[0]);
    });
  });


app.patch('/user/update/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, email, phone, password, status } = req.body;

  if (!username && !email && !phone && !password && status === undefined) {
      return res.status(400).json({ message: 'At least one field is required to update.' });
  }

  const updates = [];
  const values = [];

  if (username) {
      updates.push('username = ?');
      values.push(username);
  }
  if (email) {
      updates.push('email = ?');
      values.push(email);
  }
  if (phone) {
      updates.push('phone = ?');
      values.push(phone);
  }
  if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push('password = ?');
      values.push(hashedPassword);
  }
  if (status !== undefined) {
      updates.push('status = ?');
      values.push(status);
  }

  values.push(userId);

  const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
  db.query(query, values, (err, results) => {
      if (err) {
          console.error('Error updating user:', err);
          return res.status(500).json({ message: 'Internal server error.' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found.' });
      }

      res.status(200).json({ message: 'User updated successfully.' });
  });
});


app.delete('/user/delete/:userId', (req, res) => {
  const { userId } = req.params;

  const query = 'UPDATE users SET status = 99 WHERE id = ?';
  db.query(query, [userId], (err, results) => {
      if (err) {
          console.error('Error deleting user:', err);
          return res.status(500).json({ message: 'Internal server error.' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found.' });
      }

      res.status(200).json({ message: 'User deleted successfully.' });
  });
});


app.get('/user/all', (req, res) => {
  const query = 'SELECT id, username, email, phone, status, createdAt, updatedAt FROM users';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching users:', err);
          return res.status(500).json({ message: 'Internal server error.' });
      }

      res.status(200).json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


