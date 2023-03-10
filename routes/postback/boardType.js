const GetData = require('../../getData')

module.exports = async ({ event, line }) => {
  const boardType = await GetData.BoardTypeIntro()
  const msg = require('../../views/boardType')(boardType)
  event.ga3ScreenView('主選單-種類介紹')
  event.sendGa4({ name: 'menu', params: { type: '種類介紹' } })
  return line.replyMessage(event.replyToken, msg)
}
