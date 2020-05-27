class ticketingTaskQueue {
  constructor () {
    this.processingTask = {}
    this.count = 0
  }

  checkRunning (id) {
    if (id in this.processingTask) {
      return 1
    } else {
      return 0
    }
  }

  setMark (id) {
    this.processingTask[id] = 1
    this.count += 1
  }

  clearTask (id, workId) {
    delete this.processingTask[id]
    clearInterval(workId)
    this.count -= 1
  }
}


module.exports = ticketingTaskQueue