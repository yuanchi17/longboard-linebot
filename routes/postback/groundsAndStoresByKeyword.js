module.exports = async ({ event, ctx, line }) => {
  const msg = require('../../views/cityGroundsAndStores')(ctx)
  event.gaScreenView('查詢場地及店家')
  event.gaEventLabel('查詢場地及店家', '關鍵字-縣市', ctx.city)
  return line.replyMessage(event.replyToken, msg)
}
