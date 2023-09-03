const config = {
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER
  },
  mailer: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    mailAddress: process.env.MAIL_ADDRESS,
    mailPassword: process.env.MAIL_PASSWORD
  }
}

module.exports = config
