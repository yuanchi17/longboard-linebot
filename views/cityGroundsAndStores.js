
const GroundsDetail = require('./grounds/detail')
const quickReply = require('./quickReply')
const StoresDetail = require('./stores/detail')

module.exports = ({ items, city }) => ({
  type: 'flex',
  altText: `${city}有這些玩板場地及板店！提供給你參考參考～`,
  contents: {
    type: 'carousel',
    contents: [
      ...(items?.grounds?.length ? [GroundsDetail.bubble({ city, grounds: items.grounds })] : []),
      ...(items?.stores?.length ? [StoresDetail.bubble({ city, grounds: items.stores })] : []),
    ],
  },
  quickReply: {
    items: quickReply.shareForm('我知道其他地點'),
  },
})
