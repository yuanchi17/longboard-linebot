const GetData = require('../../getData')

module.exports = async ({ event, line }) => {
  const groundCitys = await GetData.PlayGrounds()
  const msg = require('../../views/grounds/list')(groundCitys)
  event.ga3ScreenView('主選單-玩板場地')
  return line.replyMessage(event.replyToken, msg)
}
