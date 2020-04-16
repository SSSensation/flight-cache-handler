if (process.env.NODE_ENV === 'production') {
  module.exports = {
    env: true, // production env
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
      baseUrl: 'http://106.75.244.92:3333',
      endPoint: {
        flightQuery: '/flights'
      }
    },
    privateKey: 'a8bfccb455e1e39e75ed9490aaa75ab7d771cb02f748eff6039022be7e972d3a',
    logLevel: 'ERROR' // ERROR
  }
} else {
  module.exports = {
    env: false, // development env
    mysql: {
      host: process.env.dbHost || '127.0.0.1' || 'mysqllocal',
      user: 'root',
      port: '3307',
      password: 'ufwtfie',
      database: 'ibe',
      charset: 'utf8mb4',
      queueLimit: 10,
      connectionLimit: 300
    },
    cacheRedis: {
      host: '127.0.0.1' || 'myredis',
      port: 6379,
      prefix: 'flightEngine',
      db: 0
    },
    sessionRedis: {
      host: '127.0.0.1' || 'myredis',
      port: 6379,
      db: 1
    },
    storageRedis: {
      host: '127.0.0.1' || 'myredis',
      port: 6379,
      db: 2
    },
    flightBase: {
      baseURL: 'http://127.0.0.1:3333',
      endPoint: {
        flightQuery: '/flights'
      }
    },
    privateKey: 'a8bfccb455e1e39e75ed9490aaa75cb7d771cb02f748eff6039022be7e972d3a',
    logLevel: 'DEBUG'
  }
}