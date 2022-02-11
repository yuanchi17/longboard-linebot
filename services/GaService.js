const axios = require('axios')
const Qs = require('qs')
const { getenv } = require('../libs/helpers')

const PAYLOAD_DEFAULT = {
  aip: 1, // 忽略追蹤發送者 IP
  an: 'Longboard App', // App Name
  av: '1.0.0', // App 版號
  de: 'UTF-8', // 字元編碼
  ds: 'app', // 資料來源，填寫為 app
  tid: getenv('GA_TID', 'UA-164526128-3'), // GA 追蹤代碼
  ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36', // https://stackoverflow.com/questions/27357954/google-analytics-measurement-protocol-not-working/56354451#56354451
  ul: 'zh-tw', // locale
  v: 1, // api version
}

const httpBuildQuery = obj => Qs.stringify(obj, { arrayFormat: 'brackets' })

const transformLineId = lineId => ({
  uid: lineId,
  cid: lineId.replace(/^U(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})$/, '$1-$2-$3-$4-$5'),
})

exports.gaTargetByLineId = (lineId, target = {}, defaults = {}) => {
  if (target.gaScreenView) return target // 避免重複宣告

  defaults = transformLineId(lineId)
  target.gaScreenView = async name => {
    return axios.post('https://www.google-analytics.com/collect', httpBuildQuery({
      ...defaults,
      ...PAYLOAD_DEFAULT,
      cd: name,
      t: 'screenview',
    }))
  }

  target.gaEventLabel = (category, action, label) => {
    return axios.post('https://www.google-analytics.com/collect', httpBuildQuery({
      ...defaults,
      ...PAYLOAD_DEFAULT,
      ea: action,
      ec: category,
      el: label,
      t: 'event',
    }))
  }
}
