const { client } = require('../../libs/lineat')

module.exports = async ({ event, app }) => {
  const msg = require('../../views/stores/list')(app.locals.storeCitys)
  return client.replyMessage(event.replyToken, msg)
}
