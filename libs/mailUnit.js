const nodemailer = require("nodemailer");
const log4js = require('./log4js')
const logger = log4js.getLogger('EMail')
const conf = require('./../conf')

let transporter = nodemailer.createTransport({
  host: "smtp.exmail.qq.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: conf.mail.user, 
    pass: conf.mail.pass
  }
});

exports.sendMail = async (inputInfo) => {
  try {
    let subject = inputInfo.subject
    let text = inputInfo.body
    let receiver_list = conf.mail.receivers.join(",")

    let info = await transporter.sendMail({
      from: `"TMC自动出票通知" <${conf.mail.user}>`, // sender address
      to: receiver_list, // list of receivers
      subject, // Subject line
      text, // plain text body
      // html: "<b>Hello world?</b>" // html body
    });
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return info.messageId
  } catch (e) {
    return Promise.reject(e)
  }
}

  