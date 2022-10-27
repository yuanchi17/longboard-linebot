module.exports = async ({ event, line, items, keyword }) => {
  const msg = require('../../views/play/list')({ items, type: 'keyword', keyword })
  event.gaScreenView('招式清單')
  event.gaEventLabel('招式清單', '關鍵字', keyword)
  return line.replyMessage(event.replyToken, msg)
}
