module.exports = (mysql, Sequelize) => {
  let scheduleHandler = mysql.define('ScheduleHandler', {
    // 这三个数字暂时是写在程序总设置里面
    startHour: {
      comment: '开始任务的时间（暂时保留）',
      type: Sequelize.INTEGER
    },
    endHour: {
      comment: '结束任务的时间（暂时保留）',
      type: Sequelize.INTEGER
    },
    rate: {
      comment: '刷新频率（暂时保留）',
      type: Sequelize.INTEGER
    },
    dCity: {
      comment: '始发地三字码',
      type: Sequelize.STRING(3)
    },
    aCity: {
      comment: '到达地三字码',
      type: Sequelize.STRING(3)
    },
    airline: {
      comment: '航司二字码',
      type: Sequelize.STRING(2)
    },
    dateGap: {
      comment: '刷新策略距今的开始日期',
      type: Sequelize.INTEGER
    },
    dateRange: {
      comment: '从起始日起往后刷新的日期数',
      type: Sequelize.INTEGER
    },
    isEnable: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  })

  return scheduleHandler
}
