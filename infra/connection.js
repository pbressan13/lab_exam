const mysql = require('mysql')
const config = require('config')

const dbConnect = mysql.createPool(
  {
    host: config.get('mysql.host'),
    port: config.get('mysql.port'),
    user: config.get('mysql.user'),
    password: config.get('mysql.password'),
    database: config.get('mysql.database')
  }
)

module.exports = dbConnect
