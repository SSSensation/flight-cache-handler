const axios = require('axios')
const conf = require('./../conf')
const log4js = require('./log4js')
const logger = log4js.getLogger('client')

class flightReqClient {
  constructor() {
    this.flightClient = null
  }

  async init() {
    this.__initAxios()
  }

  __initAxios() {
    let axiosConf = {
      baseURL: conf.flightBase.baseURL,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    }

    this.flightClient = axios.create(axiosConf)
  }

  async normalTasksRequest(params) {
    try {
      await this.flightClient.get(conf.flightBase.endPoint.flightQuery, params)
    } catch (e) {
      logger.error(e)
    }
  }
}

module.exports = flightReqClient