const _ = require('lodash')
const GetData = require('../../getData')

module.exports = async ({ event, args, line }) => {
  const city = args[0]
  const stores = _.get(await GetData.LongboardStores(), city)
  const msg = require('../../views/stores/detail').main({ city, stores })
  event.ga3ScreenView('查詢店家-顯示結果')
  event.ga3EventLabel('查詢店家', '縣市', city)
  return line.replyMessage(event.replyToken, msg)
}
