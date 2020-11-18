const { client } = require('../../libs/lineat')

module.exports = async ({ event, app }) => {
  console.log(app.locals.storeCitys)
  const msg = require('../../views/stores/list')(app.locals.storeCitys)
  return client.replyMessage(event.replyToken, msg)
}
