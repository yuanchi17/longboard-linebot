module.exports = async ({ event, line }) => {
  // const groundCitys = await GetData.PlayGrounds()
  // const msg = require('../../views/grounds/list')(groundCitys)
  const msg = require('../../views/grounds/link-google-map')()
  event.ga3ScreenView('主選單-玩板場地')
  event.sendGa4({ name: '主選單-玩板場地' })
  return line.replyMessage(event.replyToken, msg)
}
