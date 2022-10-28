const _ = require('lodash')
const GetData = require('../../getData')

module.exports = async ({ event, args, line }) => {
  let item = args[0]
  item = { ...item, category: _.trim(`${item.category_en} ${item.category_cn}`) }
  try {
    const playVideos = await GetData.PlayVideos()
    const videos = _.orderBy(_.compact(_.map(item.videos, vId => playVideos[vId])), 'level', 'asc')
    if (!videos.length) throw new Error('查無結果')
    event.ga3ScreenView('教學影片清單')
    event.ga3EventLabel('教學影片清單', '招式', item.category)
    return line.replyMessage(event.replyToken, require('../../views/play/videos')({ item, videos }))
  } catch (err) {
    event.ga3ScreenView('教學影片清單')
    event.ga3EventLabel('教學影片清單', err.message, item.category)
    return line.replyMessage(event.replyToken, require('../../views/play/videosEmpty')(item))
  }
}
