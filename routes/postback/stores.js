const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event }) => {
  const storeCitys = await GetData.LongboardStores()
  const msg = require('../../views/stores/list')(storeCitys)
  event.gaScreenView('主選單-滑板店家')
  return client.replyMessage(event.replyToken, msg)
}
