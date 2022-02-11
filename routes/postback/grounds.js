const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event }) => {
  const groundCitys = await GetData.PlayGrounds()
  const msg = require('../../views/grounds/list')(groundCitys)
  event.gaScreenView('主選單-玩板場地')
  return client.replyMessage(event.replyToken, msg)
}
