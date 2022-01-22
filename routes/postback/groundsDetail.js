const _ = require('lodash')
const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event, args }) => {
  const city = args[0]
  const grounds = _.get(await GetData.PlayGrounds(), city)
  const msg = require('../../views/grounds/detail')({ city, grounds })
  return client.replyMessage(event.replyToken, msg)
}
