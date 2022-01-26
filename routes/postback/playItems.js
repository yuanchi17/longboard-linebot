const _ = require('lodash')
const { client } = require('../../libs/lineat')
const GetData = require('../../getData')

module.exports = async ({ event, args, keyword }) => {
  const item = args[0]
  try {
    const items = _.map(args, async item => {
      const playVideos = await GetData.PlayVideos()
      const videos = _.compact(_.map(item.videos, vId => playVideos[vId]))
      return {
        category: _.trim(`${item.category_en} ${item.category_cn}`),
        videos,
      }
    })
    if (!items.length) throw new Error('沒有教學影片')
    return client.replyMessage(event.replyToken, require('../../views/play/videos')({ items, keyword }))
  } catch (err) {
    return client.replyMessage(event.replyToken, require('../../views/play/videosEmpty')(item))
  }
}
