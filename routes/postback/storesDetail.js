const _ = require('lodash')
const { client } = require('../../libs/lineat')

module.exports = async ({ event, app, args }) => {
  const city = args[0]
  const stores = _.get(app.locals.storeCitys, city)
  const msg = require('../../views/stores/detail')({ city, stores })
  return client.replyMessage(event.replyToken, msg)
}
