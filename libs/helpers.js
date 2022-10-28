const _ = require('lodash')
const GetData = require('../getData')
const Qs = require('qs')

/**
 * 取得 process.env.[key] 的輔助函式，且可以有預設值
 */
exports.getenv = (key, defaultval) => {
  return _.get(process, ['env', key], defaultval)
}

exports.httpBuildQuery = (obj) => Qs.stringify(obj, { arrayFormat: 'brackets' })

exports.errToPlainObj = (() => {
  const ERROR_KEYS = [
    'address',
    'code',
    'data',
    'dest',
    'errno',
    'info',
    'message',
    'name',
    'originalError.response.data',
    'originalError.response.headers',
    'originalError.response.status',
    'path',
    'port',
    'reason',
    'response.data',
    'response.headers',
    'response.status',
    'stack',
    'status',
    'statusCode',
    'statusMessage',
    'syscall',
  ]
  return err => _.pick(err, ERROR_KEYS)
})()

exports.log = (() => {
  const LOG_SEVERITY = ['DEFAULT', 'DEBUG', 'INFO', 'NOTICE', 'WARNING', 'ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY']
  return (...args) => {
    let severity = 'DEFAULT'
    if (args.length > 1 && _.includes(LOG_SEVERITY, _.toUpper(args[0]))) severity = _.toUpper(args.shift())
    _.each(args, arg => {
      if (_.isString(arg)) arg = { message: arg }
      if (arg instanceof Error) arg = exports.errToPlainObj(arg)
      console.log(JSON.stringify({ severity, ...arg }))
    })
  }
})()

exports.toGoogleMap = location => {
  const query = {
    api: 1,
    query: `${location.lat},${location.lng}`,
    openExternalBrowser: 1,
  }
  if (_.isEmpty(location.lat) || _.isEmpty(location.lng)) query.query = location.address
  return `https://www.google.com/maps/search/?${Qs.stringify(query)}`
}

// NOTE: 目前已取消跳轉 LIFF 蒐集 GA
exports.toRedirectGaUrl = ({ u, cd, ec, ea, el }) => {
  const LIFF = exports.getenv('LIFF_FULL', '1656599717-l3G7AM3d')
  return `https://liff.line.me/${LIFF}/redirect-ga?${Qs.stringify({ u, cd, ec, ea, el })}`
}

exports.SearchPlayItemsByKeyword = async keyword => {
  const items = _.flatten(await Promise.all([
    GetData.PlayItemsByType('base'),
    GetData.PlayItemsByType('dancing'),
    GetData.PlayItemsByType('freestyle'),
  ]))
  const search = _.toLower(_.trim(keyword))
  if (!search) return []

  return _.orderBy(_.compact(_.map(items, item => {
    const en = _.toLower(_.get(item, 'category_en', ''))
    const cn = _.get(item, 'category_cn', '')
    if (en === search || cn === search) return { ...item, priority: 100 } // priority: 權重
    if (en.split(' ').join('') === search) return { ...item, priority: 100 } // no comply = nocomply
    if (_.includes(en.split(' '), search)) return { ...item, priority: 99 - _.indexOf(en.split(' '), search) } // [ 'no', 'comply']
    if (_.includes(cn.split(' '), search)) return { ...item, priority: 99 - _.indexOf(cn.split(' '), search) }
    if (_.includes(item.keywords, search)) return { ...item, priority: 2 } // 相關的關鍵字
    if (_.indexOf(cn, search) > -1) return { ...item, priority: 1 }
  })), 'priority', 'desc')
}

exports.SearchGroundsAndStoresByKeyword = async keyword => {
  let [stores, grounds] = _.flatten(await Promise.all([
    GetData.LongboardStores(),
    GetData.PlayGrounds(),
  ]))

  const city = _.trim(keyword.replace('臺', '台'))
  grounds = _.get(grounds, city, [])
  stores = _.get(stores, city, [])
  if (!grounds.length && !stores.length) return {}

  return {
    city,
    grounds,
    stores,
  }
}

exports.color = {
  blue: '#98d6ea',
  gray: '#aaaaaa',
  white: '#ffffff',
}
