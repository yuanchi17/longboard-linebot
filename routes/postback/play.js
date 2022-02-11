const { client } = require('../../libs/lineat')

module.exports = async ({ event }) => {
  const msg = require('../../views/play/option')()
  event.gaScreenView('主選單-我想玩板')
  return client.replyMessage(event.replyToken, msg)
}
