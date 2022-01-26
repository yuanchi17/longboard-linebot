const _ = require('lodash')
const GetData = require('../getData')
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
    openExternalBrowser: 1,
  }
  if (_.isEmpty(location.lat) || _.isEmpty(location.lng)) query.query = location.address
  return baseUrl + Qs.stringify(query)
}

exports.searchPlayItemsByKeyword = async keyword => {
  const items = await GetData.PlayItems()
  const search = _.trim(keyword)
  if (!search) return []

  return _.orderBy(_.compact(_.map(items, item => {
    const en = _.toLower(_.get(item, 'category_en', ''))
    const cn = _.get(item, 'category_cn', '')
    if (en === search || cn === search) return { ...item, priority: 100 } // priority: 權重
    if (en.split(' ').join('') === search) return { ...item, priority: 100 } // no comply = nocomply
    if (_.includes(item.keywords, search)) return { ...item, priority: 99 } // 相關的關鍵字
    if (_.includes(en.split(' '), search)) return { ...item, priority: 98 - _.includes(en.split(' '), search) } // [ 'no', 'comply']
    if (_.includes(cn.split(' '), search)) return { ...item, priority: 98 - _.includes(cn.split(' '), search) }
  })), 'priority', 'desc')
}

exports.color = {
  blue: '#98d6ea',
  gray: '#aaaaaa',
  white: '#ffffff',
}
