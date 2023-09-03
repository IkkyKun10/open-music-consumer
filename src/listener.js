class Listener {
  constructor (playlistsService, mailSender) {
    this._playlistsService = playlistsService
    this._mailSender = mailSender

    this.listen = this.listen.bind(this)
  }

  async listen (message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString())

      const songsInPlaylist = await this._playlistsService.getSongsInPlaylist(playlistId)

      console.log(songsInPlaylist)
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songsInPlaylist))

      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Listener
