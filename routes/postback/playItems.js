const _ = require('lodash')
const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event, args }) => {
  const item = args[0]
  try {
    const playVideos = await GetData.PlayVideos()
    const videos = _.orderBy(_.compact(_.map(item.videos, vId => playVideos[vId])), 'level', 'asc')
    if (!videos.length) throw new Error('沒有教學影片')
    return client.replyMessage(event.replyToken, require('../../views/play/videos')({ item, videos }))
  } catch (err) {
    return client.replyMessage(event.replyToken, require('../../views/play/videosEmpty')(item))
  }
}
