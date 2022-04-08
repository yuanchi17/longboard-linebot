const { client } = require('../../libs/lineat')

module.exports = async ({ event, items, keyword }) => {
  const msg = require('../../views/cityGroundsAndStores')({ items, city: keyword })
  event.gaScreenView('查詢場地及店家')
  event.gaEventLabel('查詢場地及店家', '關鍵字-縣市', keyword)
  return client.replyMessage(event.replyToken, msg)
}
