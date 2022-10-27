module.exports = async ({ event, line }) => {
  const msg = require('../../views/play/option')()
  event.gaScreenView('主選單-我想玩板')
  return line.replyMessage(event.replyToken, msg)
}
