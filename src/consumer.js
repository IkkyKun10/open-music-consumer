require('dotenv').config()

const amqp = require('amqplib')
const MailSender = require('./MailSender')
const PlaylistsService = require('./PlaylistsService')
const Listener = require('./listener')
const config = require('./utils/config')

const init = async () => {
  const mailSender = new MailSender()
  const playlistsService = new PlaylistsService()
  const listener = new Listener(playlistsService, mailSender)

  const connection = await amqp.connect(config.rabbitMq.server)
  const channel = await connection.createChannel()
  const queue = 'export:songsInPlaylist'

  await channel.assertQueue(queue, {
    durable: true
  })

  await channel.consume(queue, listener.listen, { noAck: true })
}

init()
