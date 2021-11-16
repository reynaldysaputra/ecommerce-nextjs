var db = require('knex')({
  client: process.env.DB_CLIENT,
  connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERS,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  }
});

export default db;