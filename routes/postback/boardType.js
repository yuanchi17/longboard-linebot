const { client } = require('../../libs/lineat')

module.exports = async ({ event, app }) => {
  const msg = require('../../views/boardType')(app.locals.typeDetails)
  return client.replyMessage(event.replyToken, msg)
}
