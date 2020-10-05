const _ = require('lodash')
const axios = require('axios')
const Papa = require('papaparse')

exports.getCsv = async (url) => {
  url = new URL(url)
  const csv = _.trim(_.get(await axios.get(url.href), 'data')) // _.trim：把前後多餘的空格修掉
  return _.get(Papa.parse(csv, {
    encoding: 'utf8',
    header: true,
  }), 'data', [])
}

exports.getLongboardStores = async () => {
  return await exports.getCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vT5F5J1G5fZevlcbtjBIiw5U0JgInlV-OBPMzvIkGimzXaizHIaNbw_LfpuR7nW1-7kyDVHKYIV0hOd/pub?gid=0&single=true&output=csv')
}

exports.getPlaygrounds = async () => {
  return await exports.getCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vT5F5J1G5fZevlcbtjBIiw5U0JgInlV-OBPMzvIkGimzXaizHIaNbw_LfpuR7nW1-7kyDVHKYIV0hOd/pub?gid=2013906441&single=true&output=csv')
}
exports.getTypeDetail = async () => {
  return await exports.getCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vT5F5J1G5fZevlcbtjBIiw5U0JgInlV-OBPMzvIkGimzXaizHIaNbw_LfpuR7nW1-7kyDVHKYIV0hOd/pub?gid=1813045536&single=true&output=csv')
}
