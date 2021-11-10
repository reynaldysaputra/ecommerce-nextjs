var db = require('knex')({
  client: 'mysql2',
  connection: {
      host: '127.0.0.1',
      user: process.env.DB_USERS,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  }
});

export default db;