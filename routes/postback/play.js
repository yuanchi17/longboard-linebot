module.exports = async ({ event, line }) => {
  const msg = require('../../views/play/option')()
  event.ga3ScreenView('主選單-我想玩板')
  event.sendGa4({ name: 'menu', params: { type: '我想玩板' } })
  return line.replyMessage(event.replyToken, msg)
}
