require('dotenv').config()

const _ = require('lodash')
const axios = require('axios')
const Papa = require('papaparse')

// https://docs.google.com/spreadsheets/d/e/2PACX-1vT5F5J1G5fZevlcbtjBIiw5U0JgInlV-OBPMzvIkGimzXaizHIaNbw_LfpuR7nW1-7kyDVHKYIV0hOd/pub?gid=0&single=true&output=csv
// https://docs.google.com/spreadsheets/d/e/2PACX-1vT5F5J1G5fZevlcbtjBIiw5U0JgInlV-OBPMzvIkGimzXaizHIaNbw_LfpuR7nW1-7kyDVHKYIV0hOd/pubhtml?gid=2013906441&single=true

exports.getCsv = async (url) => {
  url = new URL(url)
  const csv = _.trim(_.get(await axios.get(url.href), 'data')) // _.trim：把前後多餘的空格修掉
  return _.get(Papa.parse(csv, {
    encoding: 'utf8',
    header: true,
  }), 'data', [])
}