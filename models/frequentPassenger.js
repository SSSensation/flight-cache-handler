/** 
 * 乘客信息
*/
module.exports = (mysql, Sequelize) => {
	let frequentPassenger = mysql.define('frequentPassenger', {
		name: {
			type: Sequelize.STRING(40),
			comment: '乘客姓名'
		},
		gender: {
			type: Sequelize.BOOLEAN,
			comment: '1 - MALE 2 - FEMALE'
		},
		type: {
			type: Sequelize.STRING(2),
			comment: '乘客类型 AD CH IN'
		},
		docType: {
      type: Sequelize.STRING(10),
      comment: '证件类型'
		},
		docNO: {
      type: Sequelize.STRING(40),
      comment: '证件号'
    },
    surname: {
      type: Sequelize.STRING(20),
      comment: '姓'
    },
    givenName: {
      type: Sequelize.STRING(20),
      comment: '名'
    },
    docTypeDetail: {
      type: Sequelize.STRING(2),
      comment: '证件类型描述(在证件类型为证件类型时,提供具体护照类型,如:描述F、P、AC 等)'
    },
    birthDate: {
      type: Sequelize.STRING(10),
      comment: '出生年月日'
    },
    docHolderNationality: {
      type: Sequelize.STRING(4),
      comment: '国籍二字码'
    },
    docIssueCountry: {
      type: Sequelize.STRING(4),
      comment: '护照发放国二字码'
    },
    expireDate: {
      type: Sequelize.STRING(10),
      comment: '护照有效期'
    }
	})

	return frequentPassenger
}