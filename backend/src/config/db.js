require("dotenv").config();
const knex = require("knex");

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

const db = knex({
  client: "pg",
  connection: hasDatabaseUrl
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false },
      },
});

module.exports = db;