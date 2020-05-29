if (process.env.NODE_ENV === 'production') {
  module.exports = {
    env: true, // production env
    // 生产环境调度策略
    schedule: {
      // 刷新任务的时间安排
      taskSet: '1 1 * * *',
      // 执行任务的时间安排
      taskStart: '2 1 * * *',
      // 添加扫票任务的时间安排
      ticketingTaskAdd: '*/5 * * * *',
      // 扫票频率 (微秒)
      loopTime: 1000 * 60 * 10 // 10 分钟一次 (deprecated)
    },
    mail: {
      user: 'tkt@ihisen.com',
      pass: '1234.com',
      receivers: [
        "shijingxian@ihisen.com",
        "fengying@ihisen.com",,
        "shiguanda@ihisen.com"
      ]
    },
    ctct: '13061895857',
    mysql: {
      host: '10.23.43.163', // ucloud rds
      user: 'ibeplus',
      port: '3306',
      password: 'Haixing2501',
      database: 'ibe',
      charset: 'utf8mb4',
      queueLimit: 10,
      connectionLimit: 300
    },
    cacheRedis: {
      host: '10.23.225.115', // maintained by 吴宇永
      port: 6379,
      prefix: 'flightEngine',
      db: 1,
      password: 'Zxs-2mdsr_3'
    },
    sessionRedis: {
      host: '10.23.225.115', // maintained by 吴宇永
      port: 6379,
      db: 0,
      pass: 'Zxs-2mdsr_3'
    },
    storageRedis: {
      host: '10.23.225.115',
      port: 6379,
      db: 2,
      password: 'Zxs-2mdsr_3'
    },
    flightBase: {
      baseURL: 'http://106.75.244.92:3333',
      endPoint: {
        flightQuery: '/flights',
        flightPriceQuery: '/flight',
        createOrder: '/orders'
      }
    },
    privateKey: 'a8bfccb455e1e39e75ed9490aaa75ab7d771cb02f748eff6039022be7e972d3a',
    logLevel: 'ERROR' // ERROR
  }
} else {
  module.exports = {
    env: false, // development env
    ctct: '13061895857',
    schedule: {
      ticketingTaskAdd: '*/2 * * * *',
      loopTime: 1000 * 60 * 1 // 1分钟一次 (deprecated)
    },
    mysql: {
      host: '127.0.0.1' || 'mysqllocal',
      user: 'root',
      port: '3307',
      password: 'ufwtfie',
      database: 'ibe',
      charset: 'utf8mb4',
      queueLimit: 10,
      connectionLimit: 300
    },
    cacheRedis: {
      host: 'myredis' || '127.0.0.1',
      port: 6379,
      prefix: 'flightEngine',
      db: 0
    },
    sessionRedis: {
      host: 'myredis' || '127.0.0.1',
      port: 6379,
      db: 1
    },
    storageRedis: {
      host: 'myredis' || '127.0.0.1',
      port: 6379,
      db: 2
    },
    flightBase: {
      baseURL: 'http://127.0.0.1:3333',
      // baseURL: 'http://120.132.23.140:3333',
      endPoint: {
        flightQuery: '/flights',
        flightPriceQuery: '/flight',
        createOrder: '/orders',
        createTMCOrder: '/tmc/orders'
      }
    },
    mail: {
      user: 'tkt@ihisen.com',
      pass: '1234.com',
      receivers: [
        "shijingxian@ihisen.com"
      ]
    },
    privateKey: 'a8bfccb455e1e39e75ed9490aaa75cb7d771cb02f748eff6039022be7e972d3a',
    logLevel: 'DEBUG'
  }
}