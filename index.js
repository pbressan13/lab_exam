const customExpress = require('./config/customExpress')
const dbConnect = require('./infra/connection')
const tables = require('./infra/tables')
const config = require('config')


dbConnect.getConnection(err => {
  if(err) {
    console.log('Unable to connect on database')
  } else {
    console.log('Connected successfully to database')
    tables.init(dbConnect)
    const app = customExpress()
    app.listen(process.env.PORT || config.get('api.port'), () => console.log('Server running on port 3000'))
  }
})
