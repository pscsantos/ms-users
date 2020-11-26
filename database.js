var knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'tcc-estacio-mysql.mysql.database.azure.com',
    user : 'prcosta@tcc-estacio-mysql',
    password : '1NhRhoeO',
    database : 'ms_users'
  }
});

module.exports = knex;