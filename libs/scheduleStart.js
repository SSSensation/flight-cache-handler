const schedule = require('node-schedule')
const logger = require('./log4js').getLogger('schedule')
const conf = require('./../conf')

module.exports = async (taskBase, flightlib) => {
  try {
    // （生产环境）在这里执行时间调整调度策略

    if (process.env.NODE_ENV === 'production') {
      schedule.scheduleJob(conf.schedule.taskStart, async () => {
        let intervalId = setInterval(() => {
          let task = taskBase.getOne()
          if (task) {
            flightlib.normalTasksRequest({
              params: task
            })
          } else {
            clearInterval(intervalId)
            logger.info('task done!')
          }
        }, 5000)
      })
    } else {
      // 测试环境仅循环一次
      let intervalId = setInterval(() => {
        let task = taskBase.getOne()
        if (task) {
          flightlib.normalTasksRequest({
            params: task
          })
        } else {
          clearInterval(intervalId)
          logger.info('task done!')
        }
      }, 5000)
    }

  } catch (e) {
    logger.error(e)
  }
}