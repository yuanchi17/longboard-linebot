const _ = require('lodash')
const { color, toGoogleMap, toRedirectGaUrl } = require('../../libs/helpers')
const quickReply = require('../quickReply')

const getBox = store => ({
  flex: 5,
  layout: 'vertical',
  spacing: 'sm',
  type: 'box',
  action: {
    label: 'action',
    type: 'uri',
    uri: toRedirectGaUrl({
      u: toGoogleMap(store),
      cd: '查看店家位置',
      ec: '查看店家位置',
      ea: store.city,
      el: store.name,
    }),
  },
  contents: [
    {
      text: store.name,
      type: 'text',
      weight: 'bold',
      wrap: true,
    },
    {
      layout: 'horizontal',
      type: 'box',
      contents: [
        {
          align: 'start',
          aspectMode: 'cover',
          aspectRatio: '1:1',
          flex: 1,
          gravity: 'center',
          size: '15px',
          type: 'image',
          url: 'https://i.imgur.com/eKDkkkZ.png',
        },
        {
          flex: 10,
          size: 'xs',
          text: store.address_label,
          type: 'text',
        },
      ],
    },
  ],
})

exports.bubble = ({ city, stores }) => ({
  type: 'bubble',
  header: {
    type: 'box',
    layout: 'vertical',
    backgroundColor: color.blue,
    contents: [{
      type: 'text',
      text: `${city}滑板店`,
      weight: 'bold',
      size: 'xl',
      color: color.white,
    }],
  },
  body: {
    layout: 'vertical',
    paddingAll: '0px',
    paddingBottom: '5px',
    type: 'box',
    contents: [
      ..._.map(stores, store => ({
        layout: 'vertical',
        type: 'box',
        contents: [
          {
            type: 'separator',
          },
          {
            layout: 'horizontal',
            paddingBottom: '10px',
            paddingEnd: '15px',
            paddingStart: '15px',
            paddingTop: '10px',
            type: 'box',
            contents: [
              getBox(store),
              {
                action: {
                  type: 'uri',
                  uri: toRedirectGaUrl({
                    u: store.url,
                    cd: '查看店家IG',
                    ec: '查看店家IG',
                    ea: store.city,
                    el: store.name,
                  }),
                },
                aspectMode: 'cover',
                aspectRatio: '1:1',
                gravity: 'center',
                size: '30px',
                type: 'image',
                url: 'https://i.imgur.com/swdCwTM.png',
              },
            ],
          },
        ],
      })),
    ],
  },
})

exports.main = ({ city, stores }) => ({
  type: 'flex',
  altText: `我知道${city}有這些滑板店！提供給你參考參考～`,
  contents: exports.bubble({ city, stores }),
  quickReply: {
    items: quickReply.shareForm('我知道其他店家'),
  },
})
