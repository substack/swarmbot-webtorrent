var hseed = require('hyperlog-seed')
var wseed = require('hyperlog-webtorrent-seed')
var webtorrent = require('webtorrent')
var sub = require('subleveldown')
var path = require('path')

var SEED = 's!'

module.exports = function (bot, opts) {
  if (!opts) opts = {}
  var dir = opts.seedpath
  if (!dir && opts.dir) dir = path.join(opts.dir, 'webtorrents')
  if (!dir) dir = 'webtorrents'
  var db = bot.db('swarmbot-webtorrent')
  var client = webtorrent()

  bot.on('seed-files', function (files, cb) {
    client.seed(files, cb)
  })
  bot.on('seed-list', function (cb) {
    cb(null, client.torrents.map(function (t) {
      return t.magnetURI
    }))
  })
  bot.on('open', function (id, log) {
    var seeder = hseed({
      db: bot.db(id),
      log: sub(db, SEED + id),
      map: function (row) {
        if (row.link && /^magnet:/.test(row.link)) {
          return { type: 'put', link: row.link }
        }
        if (row.unlink && /^magnet:/.test(row.unlink)) {
          return { type: 'del', link: row.unlink }
        }
      }
    })
    wseed({
      dir: dir,
      seeder: seeder,
      client: client
    })
  })
}
