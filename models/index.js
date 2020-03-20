let fs = require('fs')
let path = require('path')
let Sequelize = require('sequelize')
let conf = require('./../conf')

let mysql = new Sequelize(conf.mysql.database, conf.mysql.user, conf.mysql.password, {
  host: conf.mysql.host,
  port: conf.mysql.port,
  dialect: 'mysql',
  pool: {
    max: 300,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00',
	logging: false
})

let db = {}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== -1) && (file !== 'index.js'))
  .forEach((file) => {
    let model = mysql.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

mysql.sync().catch(console.log)

db.mysql = mysql
db.Sequelize = Sequelize

module.exports = db
