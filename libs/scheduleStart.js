const schedule = require('node-schedule')
const logger = require('./log4js').getLogger('schedule')

module.exports = async (taskBase, flightlib) => {
  try {
    // 在这里执行时间调整调度策略
    schedule.scheduleJob('30 */1 * * * *', async () => {
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
  } catch (e) {
    logger.error(e)
  }
}