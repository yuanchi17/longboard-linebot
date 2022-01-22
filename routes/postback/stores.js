const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event }) => {
  const storeCitys = await GetData.LongboardStores()
  const msg = require('../../views/stores/list')(storeCitys)
  return client.replyMessage(event.replyToken, msg)
}
