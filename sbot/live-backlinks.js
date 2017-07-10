var pull = require('pull-stream')
module.exports = function (ssb, config) {
  var subscriptions = new Set()
  return {
    subscribe: function (id) {
      subscriptions.add(id)
      console.log('subscribe', id)
    },
    unsubscribe: function (id) {
      subscriptions.delete(id)
      console.log('unsubscribe', id)
    },
    stream: function (id) {
      return pull(
        ssb.backlinks.read({old: false, index: 'DTS'}),
        pull.filter(x => subscriptions.has(x.dest))
      )
    }
  }
}
