const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event }) => {
  const boardType = await GetData.BoardTypeIntro()
  const msg = require('../../views/boardType')(boardType)
  event.gaScreenView('主選單-種類介紹')
  return client.replyMessage(event.replyToken, msg)
}
