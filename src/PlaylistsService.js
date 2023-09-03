const { Pool } = require('pg')
const NotFoundError = require('./exception/NotFoundError')

class PlaylistsService {
  constructor () {
    this._pool = new Pool()
  }

  async getPlaylistsById (id) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Playlist tidak ditemukan')
    }

    return result.rows[0]
  }

  async getSongsInPlaylist (playlistId) {
    const playlist = await this.getPlaylistsById(playlistId)

    const query = {
      text: `SELECT s.id, s.title, s.performer FROM songs s 
      INNER JOIN playlists_songs ps ON s.id = ps.song_id 
      WHERE ps.playlist_id = $1`,
      values: [playlistId]
    }

    const result = await this._pool.query(query)

    const songs = result.rows || []

    return {
      playlist: {
        ...playlist,
        songs
      }
    }
  }
}

module.exports = PlaylistsService
