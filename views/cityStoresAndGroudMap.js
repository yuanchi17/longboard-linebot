
const LinkGoogleMap = require('./grounds/linkGoogleMap')
const quickReply = require('./quickReply')
const StoresDetail = require('./stores/detail')

module.exports = ctx => {
  const { city, stores } = ctx
  return {
    type: 'flex',
    altText: `${city}有這些玩板場地及板店！提供給你參考參考～`,
    contents: {
      type: 'carousel',
      contents: [
        ...(stores?.length ? [StoresDetail.bubble({ city, stores })] : []),
        LinkGoogleMap.bubble(),
      ],
    },
    quickReply: {
      items: quickReply.shareForm({
        label: '分享更多地點',
        cd: '分享更多資訊-地點',
      }),
    },
  }
}
