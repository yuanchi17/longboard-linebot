const _ = require('lodash')
const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event, args }) => {
  const city = args[0]
  const stores = _.get(await GetData.LongboardStores(), city)
  const msg = require('../../views/stores/detail')({ city, stores })
  return client.replyMessage(event.replyToken, msg)
}
