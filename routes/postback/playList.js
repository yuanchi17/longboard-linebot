const _ = require('lodash')
const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event, args }) => {
  const type = args[0]
  const items = _.get(_.groupBy(await GetData.PlayItems(), 'type'), type)
  const msg = require('../../views/play/list')({ type, items })
  return client.replyMessage(event.replyToken, msg)
}
