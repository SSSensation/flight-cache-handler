class TaskQueue {
  constructor() {
    this.lineUp = []
    this.count = 0
  }

  setOne(task) {
    this.lineUp.push(task)
    this.count += 1
    // console.log('count:', this.count)
  }

  getOne() {
    if (this.count > 0) {
      this.count -= 1
    }
    return this.lineUp.shift()
  }

}

module.exports = TaskQueue