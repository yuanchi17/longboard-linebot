const _ = require('lodash')
const { client } = require('../../libs/lineat')

module.exports = async ({ event, app, args }) => {
  const item = args[0]
  try {
    const playVideos = app.locals.playVideos
    const videos = _.compact(_.map(item.videos, vId => playVideos[vId]))
    if (!videos.length) throw new Error('沒有教學影片')
    return client.replyMessage(event.replyToken, require('../../views/play/videos')({ item, videos }))
  } catch (err) {
    return client.replyMessage(event.replyToken, require('../../views/play/videosEmpty')(item))
  }
}
