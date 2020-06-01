module.exports = (mysql, Sequelize) => {
  let task = mysql.define('autoTicketingTask', {
    priceLimit: {
      type: Sequelize.DECIMAL(19, 4),
      comment: '最高开票价格'
    },
    departureDate: {
      type: Sequelize.STRING(10),
      comment: '行程日期'
    },
    dCity: {
      type: Sequelize.STRING(3),
      comment: '出发地'
    },
    aCity: {
      type: Sequelize.STRING(3),
      comment: '到达地'
    },
    latestBookingTime: {
      type: Sequelize.STRING(20),
      comment:'最晚抓票时间'
    },
    scanInterval: {
      type: Sequelize.INTEGER,
      comment: '扫票间隔时间(分钟)',
      defaultValue: 5
    },
    reserveTime: {
      type: Sequelize.INTEGER,
      comment: '预留出行时间(分钟)，过滤掉来不及登机的航班',
      defaultValue: 60
    },
    airline: {
      type: Sequelize.STRING(2),
      comment: '航司'
    },
    flightNO: {
      type: Sequelize.STRING(6),
      comment: '航班号'
    },
    status: {
      type: Sequelize.STRING(1),
      comment: '任务状态, 0 - 等待执行状态, 1 - 已完成, 2 - 已过期, 3 - 手动停止',
      defaultValue: 0
    }
  })

  task.associate = (models) => {
    task.belongsTo(models.frequentPassenger, {
			foreignKey: {
				allowNull: false
			}
    })
  }

  return task
}