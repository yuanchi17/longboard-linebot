const GetData = require('../../getData')

module.exports = async ({ event, line }) => {
  const groundCitys = await GetData.PlayGrounds()
  const msg = require('../../views/grounds/list')(groundCitys)
  event.gaScreenView('主選單-玩板場地')
  return line.replyMessage(event.replyToken, msg)
}
