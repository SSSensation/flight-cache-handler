const conf = require('./../conf')
const log4js = require('log4js')


log4js.configure({
  // 每个appender就是一个log输出
  appenders: {
    console: {
      type: 'console'
    },
    Cache: {
      type: 'file',
      filename: __dirname + '/../logs/Cache.log',
      backups: 1000,
      compress: true
    },
    API: {
      type: 'file',
      filename: __dirname + '/../logs/API.log',
      backups: 1000,
      compress: true
    }
  },
  // 定义上面的log输出的集合，然后取一个名字，用在getLogger中
  categories: {
    default: {
      appenders: [
        'console'
      ],
      level: 'all'
    },
    API: {
      appenders: [
        'console', 'API'
      ],
      level: conf.logLevel
    },
    Cache: {
      appenders: [
        'console', 'Cache'
      ],
      level: conf.logLevel
    }
  }
})

module.exports = log4js