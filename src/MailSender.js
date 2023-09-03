const nodemailer = require('nodemailer')
const config = require('./utils/config')

class MailSender {
  constructor () {
    this._transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      secure: true,
      auth: {
        user: config.mailer.mailAddress,
        pass: config.mailer.mailPassword
      }
    })
  }

  sendEmail (targetEmail, content) {
    const message = {
      from: 'AlbumSongapp',
      to: targetEmail,
      subject: 'Export Musik from Playlist',
      text: 'Terlampir hasil export songs dari playlist',
      attachments: [
        {
          filename: 'songs.json',
          content
        }
      ]
    }

    return this._transporter.sendMail(message)
  }
}

module.exports = MailSender
