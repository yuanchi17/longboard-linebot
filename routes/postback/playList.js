const { client } = require('../../libs/lineat')

module.exports = async ({ event, app, args }) => {
  const type = args[0]
  const msg = require('../../views/play/list')({ type, items: app.locals.playItems[type] })
  return client.replyMessage(event.replyToken, msg)
}
