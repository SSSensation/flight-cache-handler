/** 
 * 乘客 + 航段信息
 * 
*/
module.exports = (mysql, Sequelize) => {
	let Order = mysql.define('order', {
    source: {
			type: Sequelize.INTEGER,
			comment: '订单来源：1 for ibe, 2 for 携程, 3 for eterm, ***'
		},
		status: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      // 订单状态就不去涉及什么退票改签之类的了，这些内容就放到orderPassenger中去做
      comment: '订单状态 0 - 初始化 3 - 已占位  2 - 已出票 1 - 部分出票 4 - 已取消'
    },
    bizOrderId: {
      type: Sequelize.STRING(36),
      comment: '分销商订单号'
    },
    bizCode: {
      type: Sequelize.STRING(2),
      comment: '分销商代码'
    },
    contactPhone: {
      type: Sequelize.STRING(20),
      comment: '联系电话'
    },
    bigCustomer: {
      type: Sequelize.BOOLEAN,
      comment: '是否是大客户单'
    }
  }, {
    getterMethods: {
      statusName () {
        switch (this.status) {
          case 0:
            return '新订单'
          case 3:
            return '已占位'
          case 2:
            return '已出票'
          case 1:
            return '部分出票'
          case 4:
            return '已取消'
          case 5:
            return '出票失败'
          default:
            return '错误状态'
        }
      }
    }
  })

  Order.associate = (models) => {
    Order.hasMany(models.PNR)
  }

	return Order
}