// // server/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const db = require('./db');

// // Signup
// router.post('/signup', async (req, res) => {
//   const { fullname, email, password, role } = req.body;

//   if (!fullname || !email || !password || !role) {
//     return res.status(400).send('All fields are required');
//   }

//   try {
//     // Check if user exists
//     const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (existing.rows.length > 0) {
//       return res.status(400).send('User already exists');
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert into DB
//     await db.query(
//       'INSERT INTO users (fullname, email, password, role) VALUES ($1, $2, $3, $4)',
//       [fullname, email, hashedPassword, role]
//     );

//     res.status(201).send('User registered successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const userRes = await db.query('SELECT * FROM users WHERE email = $1', [email]);

//     if (userRes.rows.length === 0) {
//       return res.status(400).send('Invalid credentials');
//     }

//     const user = userRes.rows[0];

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send('Invalid credentials');
//     }

//     // Auth success (can create JWT here if needed)
//     res.status(200).send(`Welcome ${user.fullname}, logged in as ${user.role}`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;





//checking
// server/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./db');

// Signup
router.post('/signup', async (req, res) => {
  let { fullname, email, password, role } = req.body;

  if (!fullname || !email || !password || !role) {
    return res.status(400).send('All fields are required');
  }

  // Normalize email
  email = email.toLowerCase().trim();

  try {
    // Check if user exists
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).send('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    await db.query(
      'INSERT INTO users (fullname, email, password, role) VALUES ($1, $2, $3, $4)',
      [fullname, email, hashedPassword, role]
    );

    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // Normalize email
  email = email.toLowerCase().trim();

  console.log('Login attempt:', email);

  try {
    const userRes = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userRes.rows.length === 0) {
      console.log('User not found');
      return res.status(400).send('Invalid credentials');
    }

    const user = userRes.rows[0];
    console.log('User found:', user.email);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Auth success
    res.status(200).send(`Welcome ${user.fullname}, logged in as ${user.role}`);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
