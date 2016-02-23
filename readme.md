# swarmbot-webtorrent

webtorrent seeding plugin for [swarmbot][1]

# example

When you publish documents to a [swarmlog][2] mirrored by [swarmbot][1]
with a `link` property containing a magnet link:

``` js
var swarmlog = require('swarmlog')
var memdb = require('memdb')

var log = swarmlog({
  keys: require('./keys.json'),
  sodium: require('chloride/browser'),
  db: memdb(),
  valueEncoding: 'json',
  hubs: [ 'https://signalhub.mafintosh.com' ]
})
log.append({
  link: 'magnet:?xt=urn:btih:6a9759bffd5c0af65319979fb7832189f4f3c35d&dn=sintel.mp4&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.webtorrent.io&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel-1024-surround.mp4'
})
```

then this plugin will download and seed that torrent over webtorrent.

# install

Install swarmbot-webtorrent into your swarmbot config directory with npm:

```
$ swarmbot plugins install swarmbot-webtorrent
```

# license

BSD

[1]: https://npmjs.com/package/swarmbot
[2]: https://npmjs.com/package/swarmlog
