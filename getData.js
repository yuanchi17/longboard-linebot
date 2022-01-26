const _ = require('lodash')
const axios = require('axios')
const Papa = require('papaparse')
const Qs = require('qs')

const CSV_BASE_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5F5J1G5fZevlcbtjBIiw5U0JgInlV-OBPMzvIkGimzXaizHIaNbw_LfpuR7nW1-7kyDVHKYIV0hOd/pub?single=true&output=csv&'

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
  const longboardStores = await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 0 }, { arrayFormat: 'brackets' })}`)
  return _.groupBy(longboardStores, 'city')
}

exports.PlayGrounds = async () => {
  const playgrounds = await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 2013906441 }, { arrayFormat: 'brackets' })}`)
  return _.groupBy(playgrounds, 'city')
}

exports.BoardTypeIntro = async () => {
  return await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 1813045536 }, { arrayFormat: 'brackets' })}`)
}

exports.PlayKeywords = async () => {
  return await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 88331301 }, { arrayFormat: 'brackets' })}`)
}

exports.PlayVideos = async () => {
  const playVideos = _.map(await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 1554311729 }, { arrayFormat: 'brackets' })}`), video => ({
    ...video,
    id: _.toSafeInteger(video.id),
  }))
  return _.keyBy(playVideos, 'id')
}

exports.PlayItems = async () => {
  const items = await exports.getCsv(`${CSV_BASE_URL}${Qs.stringify({ gid: 922266960 }, { arrayFormat: 'brackets' })}`)
  return _.map(items, item => ({
    ...item,
    id: _.toSafeInteger(item.id),
    keywords: _.map(item.keywords.split(','), _.toLower),
    videos: _.map(item.videos.split(','), _.toSafeInteger),
  }))
}
