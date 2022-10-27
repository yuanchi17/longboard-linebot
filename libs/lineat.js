const { getenv } = require('../libs/helpers')
const line = require('@line/bot-sdk')

const config = {
  channelId: getenv('LINE_CHANNEL_ID'),
  channelSecret: getenv('LINE_CHANNEL_SECRET'),
  channelAccessToken: getenv('LINE_CHANNEL_ACCESSTOKEN'),
}

module.exports = {
  line,
  middleware: line.middleware(config),
}
