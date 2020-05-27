/** 
 * PNR信息
 * 
*/
module.exports = (mysql, Sequelize) => {
	let PNR = mysql.define('PNR', {
		PNR: {
			type: Sequelize.STRING(6),
			comment: 'PNR编码'
		},
    ticketingDeadline: {
      type: Sequelize.STRING(20),
      comment: '最晚出票日期'
    },
    loadError: {
      type: Sequelize.STRING(255),
      comment: 'PNR读取的错误信息'
    },
    ticketingDate: {
      type: Sequelize.DATE,
      comment: '实际出票日期'
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      comment: 'PNR状态 0 - new 1 - ticketing 2 - 已取消'
    }
	})

	PNR.associate = (models) => {
		PNR.belongsTo(models.order, {
			foreignKey: {
				allowNull: false
			}
    })
	}
	return PNR
}