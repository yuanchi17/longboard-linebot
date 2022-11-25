const GetData = require('../../getData')

module.exports = async ({ event, args, line }) => {
  const type = args[0]
  const items = await GetData.PlayItemsByType(type)
  const msg = require('../../views/play/list')({ type, items })
  event.ga3ScreenView('招式清單')
  event.ga3EventLabel('招式清單', '類別', type)
  event.sendGa4({ name: '招式清單', params: { 類別: type } })
  return line.replyMessage(event.replyToken, msg)
}
