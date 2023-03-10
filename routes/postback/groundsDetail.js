const _ = require('lodash')
const GetData = require('../../getData')

module.exports = async ({ event, args, line }) => {
  const city = args[0]
  const grounds = _.get(await GetData.PlayGrounds(), city)
  const msg = require('../../views/grounds/detail').main({ city, grounds })
  event.ga3ScreenView('查詢玩板場地-顯示結果')
  event.ga3EventLabel('查詢玩板場地', '縣市', city)
  event.sendGa4({
    name: 'show_list',
    params: {
      list_type: '查詢場地及店家',
      list_name: city,
    },
  })
  return line.replyMessage(event.replyToken, msg)
}
