module.exports = async ({ event, line, items, keyword }) => {
  const msg = require('../../views/play/list')({ items, type: 'keyword', keyword })
  event.ga3ScreenView('招式清單')
  event.ga3EventLabel('招式清單', '關鍵字', keyword)
  event.sendGa4({
    name: 'show_list',
    params: {
      list_type: '招式清單_關鍵字',
      list_name: keyword,
    },
  })
  return line.replyMessage(event.replyToken, msg)
}
