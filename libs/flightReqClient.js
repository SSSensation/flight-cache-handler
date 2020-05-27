const axios = require('axios')
const conf = require('./../conf')
const log4js = require('./log4js')
const logger = log4js.getLogger('client')
const qs = require('qs');

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
        'Content-Type': 'application/json;charset=UTF-8'
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

  async scanFlight(params) {
    try {
      let result = await this.flightClient.get(conf.flightBase.endPoint.flightQuery, params)

      return result.data
    } catch (e) {
      logger.error(e)
    }
  }

  async getPriceWithFlightKey(params) {
    try {
      let result = await this.flightClient.get(conf.flightBase.endPoint.flightPriceQuery, params)
      return result.data
    } catch (e) {
      logger.error(e)
    }
  }

  async createTMCOrder(body) {
    try {
      let result = await this.flightClient.post(conf.flightBase.endPoint.createTMCOrder, body)
      return result.data
    } catch (e) {
      logger.error(e)
    }
  }
}

module.exports = flightReqClient