const _ = require('lodash')
const axios = require('axios')
const Helpers = require('./libs/helpers')
const Papa = require('papaparse')

exports.getCsv = async (url, cachetime = 3e4) => {
  const csv = _.trim(_.get(await axios.get(url, { // _.trim：把前後多餘的空格、BOM 修掉
    params: { cachebust: _.floor(Date.now() / cachetime) },
  }), 'data'))
  return _.get(Papa.parse(csv, {
    encoding: 'utf8',
    header: true,
  }), 'data', [])
}

exports.LongboardStores = async () => {
  const longboardStores = await exports.getCsv(Helpers.getenv('LONGBOARD_STORES_CSV'))
  return _.groupBy(longboardStores, 'city')
}

exports.PlayGrounds = async () => {
  const playgrounds = await exports.getCsv(Helpers.getenv('PLAY_GROUNDS_CSV'))
  return _.groupBy(playgrounds, 'city')
}

exports.BoardTypeIntro = async () => {
  return await exports.getCsv(Helpers.getenv('BOARD_TYPE_INTRO_CSV'))
}

exports.PlayVideos = async () => {
  const playVideos = _.map(await exports.getCsv(Helpers.getenv('PLAY_VIDEOS_CSV')), video => ({
    ...video,
    id: _.toSafeInteger(video.id),
  }))
  return _.keyBy(playVideos, 'id')
}

exports.PlayItemsByType = async type => {
  const gidMap = {
    base: Helpers.getenv('PLAY_ITEMS_BASE_CSV'),
    dancing: Helpers.getenv('PLAY_ITEMS_DANCING_CSV'),
    freestyle: Helpers.getenv('PLAY_ITEMS_FREESTYLE_CSV'),
  }
  const items = await exports.getCsv(gidMap[type])
  return _.map(items, item => ({
    ...item,
    keywords: _.map(item.keywords.split(','), _.toLower),
    videos: _.map(item.videos.split(','), _.toSafeInteger),
  }))
}
