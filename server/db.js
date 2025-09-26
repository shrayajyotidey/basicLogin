// require('dotenv').config(); // load .env variables
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// module.exports = pool;



// require('dotenv').config(); // Must be at the top!
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD, // This must be a string
//   port: Number(process.env.DB_PORT), // Just to be safe, convert to number
// });

// module.exports = pool;


//require('dotenv').config(); // Make sure this is at the top!
require('dotenv').config({ path: './server/.env' });

console.log('Loaded env vars:');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PASSWORD type:', typeof process.env.DB_PASSWORD);

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});
2
module.exports = pool;





// require('dotenv').config();
// console.log(require('fs').readFileSync('.env', 'utf8'));
