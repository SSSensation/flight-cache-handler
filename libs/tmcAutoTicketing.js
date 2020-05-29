const schedule = require('node-schedule')
const conf = require('./../conf')
const models = require('./../models')
const mailClient = require('./mailUnit')
const moment = require('moment')
const uuid = require('uuid/v1')
const logger = require('./log4js').getLogger('AutoTkt')


module.exports = async (tktTaskBase, flightlib) => {

  if (process.env.NODE_ENV == 'production') {
    schedule.scheduleJob(conf.schedule.ticketingTaskAdd, async () => {
      // get task from database and add new ones into tktTaskBase
      await workFunc(tktTaskBase, flightlib)
    })
  } else {
    // get task from database and add new ones into tktTaskBase
    schedule.scheduleJob(conf.schedule.ticketingTaskAdd, async () => {
      await workFunc(tktTaskBase, flightlib)
    })
  }
}

const workFunc = async (tktTaskBase, flightlib) => {
  let allCurrentTask = await models.autoTicketingTask.findAll({
    where: {
      status: 0
    },
    include: [{
      model: models.frequentPassenger,
      require: true
    }]
  })

  for (let t of allCurrentTask) {
    if (tktTaskBase.checkRunning(t.id)) {
      // pass
      // 检查过期让任务的interval来做
    } else {
      // 开启一个任务
      tktTaskBase.setMark(t.id)
      let workId = setInterval(async () => {

        try {
          // timeout
          if (moment(t.latestBookingTime).utc() > moment().utc() || moment(t.departureDate).utc() > moment().utc()) {
            // update task status in database
            await models.autoTicketingTask.update({ status: '2' }, {
              where: {
                id: t.id
              }
            })
            // send emails to everyone on the address list
            let mailInfo = {
              subject: `自动占座系统通知：乘客【${t.frequentPassenger.name}】`,
              body: `占座失败，当前时间已超过最晚抓票时间`
            }
            await mailClient.sendMail(mailInfo)
            // clear task from taskbase
            tktTaskBase.clearTask(t.id, workId)
            return
          }

          // close current scanInterval
          let currentTaskInfo = await models.autoTicketingTask.findOne({
            where: {
              id: t.id
            }
          })

          if (currentTaskInfo.status === '3') {
            tktTaskBase.clearTask(t.id, workId)
            return
          }

          // scan tkt
          let queryOption = {
            dCity: t.dCity,
            aCity: t.aCity,
            departureDate: t.departureDate,
            carrier: t.airline,
            force: true
          }

          let flightInfo = await flightlib.scanFlight({
            params:
              queryOption
          })

          let orderSentry = false

          if (flightInfo.error === 0) {
            for (let flight of flightInfo.data) {
              if (t.frequentPassenger.type === 'AD') {
                if (parseInt(flight.lowestPrice) > t.priceLimit) {
                  continue
                }
              }

              let priceInfo = await flightlib.getPriceWithFlightKey({
                params: {
                  flightKey: flight.flightKey
                }
              })

              if (priceInfo.error === 0) {
                for (let cabin of priceInfo.data.flightClasses) {
                  if (parseInt(cabin.prices[t.frequentPassenger.type].price) <= t.priceLimit) {
                    let priceId = cabin.prices[t.frequentPassenger.type].id

                    let passenger = {}
                    if (t.frequentPassenger.docType === 'NI') {
                      passenger = {
                        docNO: t.frequentPassenger.docNO,      // "320623199212167498",
                        docType: t.frequentPassenger.docType,  // "NI",
                        gender: t.frequentPassenger.gender ? 1 : 0,// "1",
                        name: t.frequentPassenger.name, // "丘吉尔",
                        type: t.frequentPassenger.type // "AD"
                      }
                    } else if (t.frequentPassenger.docType === 'PP') {
                      passenger = {
                        docNO: t.frequentPassenger.docNO,  // "EC2110676",
                        docType: t.frequentPassenger.docType, // "PP",
                        gender: t.frequentPassenger.gender ? 1 : 0,
                        name: t.frequentPassenger.name,
                        type: t.frequentPassenger.type,
                        surname: t.frequentPassenger.surname,
                        givenName: t.frequentPassenger.givenName,
                        docTypeDetail: t.frequentPassenger.docTypeDetail,
                        birthDate: t.frequentPassenger.birthDate,
                        docHolderNationality: t.frequentPassenger.docHolderNationality,
                        docIssueCountry: t.frequentPassenger.docIssueCountry,
                        expireDate: t.frequentPassenger.expireDate
                      }
                    }

                    let orderInfo = {
                      prices: [
                        {
                          priceId: priceId
                        }
                      ],
                      passengers: [
                        passenger
                      ],
                      contactPhone: conf.agent,
                      bizOrderId: uuid(),
                      bizCode: "AA",
                      sales: "AutoTkt",
                      salePrice: cabin.prices[t.frequentPassenger.type].price,
                      saleDate: moment().format('YYYY-MM-DD'),
                    }

                    let result = await flightlib.createTMCOrder(orderInfo)
                    if (result.error === 0) {
                      // set orderSentry to true
                      orderSentry = true

                      // get PNR
                      let order = await models.order.findOne({
                        where: {
                          id: result.data.orderId
                        },
                        include: [
                          {
                            model: models.PNR
                          }
                        ]
                      })
                      // send emails to everyone on the address list
                      let mailInfo = {
                        subject: `自动占座系统通知：乘客【${t.frequentPassenger.name}】`,
                        body: `已经帮乘客：${t.frequentPassenger.name} 占座，订单编号${result.data.orderId}, PNR编码 ${order.PNRs[0].PNR}`
                      }
                      await mailClient.sendMail(mailInfo)
                      // change task status to '1'
                      await models.autoTicketingTask.update({ status: '1' }, {
                        where: {
                          id: t.id
                        }
                      })
                      // clear this task from taskBase
                      tktTaskBase.clearTask(t.id, workId)
                      break
                    }
                  }
                }
              }
              if (orderSentry) {
                break
              }

            }
          } else {
            // search ticket malfunctioned
          }
        } catch (e) {
          logger.error(e)
        }
      }, t.scanInterval * 60 * 1000)
    }
  }

}

// 邮件直接发送记录编号PNR
// 添加最晚抓票时间 (done)
// 扫票频率自定义 (done)
// 加关闭任务功能 (done)