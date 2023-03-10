module.exports = async ({ event, ctx, line }) => {
  const msg = require('../../views/cityStoresAndGroudMap')(ctx)
  event.ga3ScreenView('查詢場地及店家')
  event.ga3EventLabel('查詢場地及店家', '關鍵字-縣市', ctx.city)
  event.sendGa4({
    name: 'show_list',
    params: {
      list_type: '查詢場地及店家_關鍵字',
      list_name: ctx.city,
    },
  })
  return line.replyMessage(event.replyToken, msg)
}
