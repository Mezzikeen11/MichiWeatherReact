const knex = require("knex");

const buildConnection = () => {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    ssl: { rejectUnauthorized: false },
  };
};

const db = knex({
  client: "pg",
  connection: buildConnection(),
  pool: {
    min: 0,
    max: 10,
  },
});

module.exports = db;
