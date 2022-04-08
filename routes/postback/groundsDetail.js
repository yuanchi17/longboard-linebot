const _ = require('lodash')
const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event, args }) => {
  const city = args[0]
  const grounds = _.get(await GetData.PlayGrounds(), city)
  const msg = require('../../views/grounds/detail').main({ city, grounds })
  event.gaScreenView('查詢玩板場地-顯示結果')
  event.gaEventLabel('查詢玩板場地', '縣市', city)
  return client.replyMessage(event.replyToken, msg)
}
