const { client } = require('../../libs/lineat')

module.exports = async ({ event }) => {
  const msg = require('../../views/play/option')()
  return client.replyMessage(event.replyToken, msg)
}
