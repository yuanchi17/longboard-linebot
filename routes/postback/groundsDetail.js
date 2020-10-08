const _ = require('lodash')
const { client } = require('../../libs/lineat')

module.exports = async ({ event, app, args }) => {
  const city = args[0]
  const grounds = _.get(app.locals.groundCitys, city)
  const msg = require('../../views/grounds/detail')({ city, grounds })
  return client.replyMessage(event.replyToken, msg)
}
