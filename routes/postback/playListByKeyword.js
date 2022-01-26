const { client } = require('../../libs/lineat')

module.exports = async ({ event, items, keyword }) => {
  const msg = require('../../views/play/list')({ items, type: 'keyword', keyword })
  return client.replyMessage(event.replyToken, msg)
}
