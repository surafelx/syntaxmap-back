const { Pool, Client } = require('pg')
require('dotenv').config();

const connectionString = process.env.DATABASE_URL


const pool = new Pool({
  user: 'tensemapadmin',
  host: 'localhost',
  database: 'tensemapdb',
  password: 'tensemappwd',
  port: 5432,
  ssl: false, // Disable SSL
});
module.exports = pool;
