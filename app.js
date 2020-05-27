const express = require('express')
const compression = require('compression')

const libs = require('./libs')
const flightReqClient = require('./libs/flightReqClient')

const TaskQueue = require('./libs/taskQueue')
const taskBase = new TaskQueue()
const ticketingTask = require('./libs/ticketingTaskQueue')
const tktTaskBase = new ticketingTask()


const flightlib = new flightReqClient()
flightlib.init()


// 加载任务程序
libs.scheduleSet(taskBase)
// 请求发起程序
libs.scheduleStart(taskBase, flightlib)

// 启动代理出票程序
libs.tmcAutoTicketing(tktTaskBase, flightlib)


const app = express()

app.use(compression())

module.exports = app