const axios = require('axios')
const Qs = require('qs')
const { getenv } = require('../libs/helpers')

// https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events?client_type=gtag#required_parameters
const PAYLOAD_DEFAULT = {
  measurement_id: getenv('MEASUREMENT_ID'), // GA4 追蹤代碼
  api_secret: getenv('MEASUREMENT_PROTOCOL_KEY'),
  // client_id: 'LINE Longboard Staging',
}

const httpBuildQuery = obj => Qs.stringify(obj, { arrayFormat: 'brackets' })

exports.gaTargetByLineId = (lineId, target = {}) => {
  if (target.sendGa4) return target // 避免重複宣告

  target.sendGa4 = async events => {
    return axios.post('https://www.google-analytics.com/collect', httpBuildQuery({
      ...PAYLOAD_DEFAULT,
      user_id: lineId,
      events,
    }))
  }
}
