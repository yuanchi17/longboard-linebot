
const GroundsDetail = require('./grounds/detail')
const quickReply = require('./quickReply')
const StoresDetail = require('./stores/detail')

module.exports = ctx => {
  const { city, grounds, stores } = ctx
  return {
    type: 'flex',
    altText: `${city}有這些玩板場地及板店！提供給你參考參考～`,
    contents: {
      type: 'carousel',
      contents: [
        ...(grounds?.length ? [GroundsDetail.bubble({ city, grounds })] : []),
        ...(stores?.length ? [StoresDetail.bubble({ city, stores })] : []),
      ],
    },
    quickReply: {
      items: quickReply.shareForm({
        label: '我知道其他地點',
        cd: '分享更多資訊-地點',
      }),
    },
  }
}
