const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event }) => {
  const boardType = await GetData.BoardTypeIntro()
  const msg = require('../../views/boardType')(boardType)
  return client.replyMessage(event.replyToken, msg)
}
