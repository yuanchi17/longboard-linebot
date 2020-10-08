const { client } = require('../../libs/lineat')

module.exports = async ({ event, app }) => {
  const msg = require('../../views/grounds/list')(app.locals.groundCitys)
  return client.replyMessage(event.replyToken, msg)
}
