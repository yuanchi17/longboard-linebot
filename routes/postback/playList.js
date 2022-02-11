const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event, args }) => {
  const type = args[0]
  const items = await GetData.PlayItemsByType(type)
  const msg = require('../../views/play/list')({ type, items })
  event.gaScreenView('招式清單')
  event.gaEventLabel('招式清單', '類別', type)
  return client.replyMessage(event.replyToken, msg)
}
