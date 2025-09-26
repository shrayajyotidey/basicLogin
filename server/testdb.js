const pool = require('./db');

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connected to DB at:', result.rows[0].now);
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
  } finally {
    await pool.end();
  }
})();











////server.js

// server.js
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');

// const app = express();
// const authRoutes = require('./server/authRoutes');

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.use('/auth', authRoutes);

// // Default page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// // Server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });