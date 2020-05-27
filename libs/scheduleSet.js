const models = require('../models')
const moment = require('moment')
const _ = require('lodash')
const schedule = require('node-schedule')
const logger = require('./log4js').getLogger('schedule')
const conf = require('./../conf')

module.exports = async (taskBase) => {

  try {
    // 在这里调整调度策略加载时间(生产环境)

    if (process.env.NODE_ENV === 'production') {
      schedule.scheduleJob(conf.schedule.taskSet, async () => {
        await setData(taskBase)
      })
    } else {
      // 测试环境只加载一次
      await setData(taskBase)
    }
  } catch (e) {
    logger.error(e)
  }
}

const setData = async (taskBase) => {
  logger.debug('I am in the scheduleSet func')
  let result = await models.ScheduleHandler.findAll({
    where: {
      isEnable: true
    }
  })

  if (!result) {
    logger.debug('No schedule arranged.')
    return
  }

  result = JSON.parse(JSON.stringify(result))

  for (let i = 0; i < result.length; i++) {
    let tempData = result[i]

    let params = {
      dCity: tempData.dCity,
      aCity: tempData.aCity,
      carrier: tempData.airline
    }

    let dateGap = tempData.dateGap
    let startDate = moment().add(dateGap, 'days')

    for (let j = 0; j < tempData.dateRange; j++) {
      let departureDate = startDate.add(1, 'days').format('YYYY-MM-DD')
      params.departureDate = departureDate
      taskBase.setOne(_.cloneDeep(params))
    }

  }
}