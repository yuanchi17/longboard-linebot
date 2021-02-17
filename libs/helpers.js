const _ = require('lodash')
const Qs = require('qs')

/**
 * 取得 process.env.[key] 的輔助函式，且可以有預設值
 */
exports.getenv = (key, defaultval) => {
  return _.get(process, ['env', key], defaultval)
}

exports.toGoogleMap = location => {
  const baseUrl = 'https://www.google.com/maps/search/?'
  const query = {
    api: 1,
    query: `${location.lat},${location.lng}`,
  }
  if (_.isEmpty(location.lat) || _.isEmpty(location.lng)) query.query = query.address
  return baseUrl + Qs.stringify(query)
}

exports.color = {
  blue: '#98d6ea',
  gray: '#aaaaaa',
  white: '#ffffff',
}
