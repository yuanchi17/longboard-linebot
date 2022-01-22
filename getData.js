const _ = require('lodash')
const axios = require('axios')
const Papa = require('papaparse')
const Qs = require('qs')

const CSV_BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5F5J1G5fZevlcbtjBIiw5U0JgInlV-OBPMzvIkGimzXaizHIaNbw_LfpuR7nW1-7kyDVHKYIV0hOd/pub?single=true&output=csv&'

exports.getCsv = async url => {
  const csv = _.trim(_.get(await axios.get(url), 'data')) // _.trim：把前後多餘的空格、BOM 修掉
  return _.get(Papa.parse(csv, {
    encoding: 'utf8',
    header: true,
  }), 'data', [])
}

exports.LongboardStores = async app => {
  const longboardStores = await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 0 }, { arrayFormat: 'brackets' })}`)
  app.locals.storeCitys = _.groupBy(longboardStores, 'city')
}

exports.Playgrounds = async app => {
  const playgrounds = await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 2013906441 }, { arrayFormat: 'brackets' })}`)
  app.locals.groundCitys = _.groupBy(playgrounds, 'city')
}
exports.TypeDetail = async app => {
  app.locals.typeDetails = await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 1813045536 }, { arrayFormat: 'brackets' })}`)
}

exports.PlayKeywords = async app => {
  app.locals.playKeywords = await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 88331301 }, { arrayFormat: 'brackets' })}`)
}

exports.PlayVideos = async app => {
  const playVideos = _.map(await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 1554311729 }, { arrayFormat: 'brackets' })}`), video => ({
    ...video,
    id: _.toSafeInteger(video.id),
  }))
  app.locals.playVideos = _.keyBy(playVideos, 'id')
}

exports.PlayItems = async app => {
  app.locals.playItems = _.chain(await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 922266960 }, { arrayFormat: 'brackets' })}`))
    .map(item => ({
      ...item,
      id: _.toSafeInteger(item.id),
      videos: _.map(item.videos.split(','), _.toSafeInteger),
    }))
    .groupBy('type')
    .value()
}
