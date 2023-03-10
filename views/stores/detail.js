const _ = require('lodash')
const { color, toGoogleMap } = require('../../libs/helpers')
const quickReply = require('../quickReply')

const getBox = store => ({
  flex: 5,
  layout: 'vertical',
  spacing: 'sm',
  type: 'box',
  action: {
    label: 'action',
    type: 'uri',
    uri: toGoogleMap(store),
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
    backgroundColor: color.blue,
    layout: 'vertical',
    paddingBottom: '8px',
    paddingTop: '8px',
    type: 'box',
    contents: [
      {
        height: '60px',
        layout: 'vertical',
        paddingAll: '8px',
        type: 'box',
        width: '60px',
        contents: [
          {
            type: 'image',
            url: 'https://i.imgur.com/geuwlVu.png',
          },
        ],
      },
      {
        height: '76px',
        layout: 'vertical',
        offsetStart: '90px',
        position: 'absolute',
        type: 'box',
        contents: [
          {
            color: color.white,
            flex: 1,
            gravity: 'center',
            size: 'xl',
            text: `${city}板店`,
            type: 'text',
            weight: 'bold',
          },
        ],
      },
    ],
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
                  uri: store.url,
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

exports.main = ({ city, stores }) => ([
  {
    type: 'text',
    text: '點擊想去的店家立刻開起 Google 地圖帶你去！想看看店家 IG 請點擊右方圖示～',
  },
  {
    type: 'flex',
    altText: `我知道${city}有這些板店！提供給你參考參考～`,
    contents: exports.bubble({ city, stores }),
    quickReply: {
      items: quickReply.shareForm({
        label: '我知道其它店家',
        cd: '分享更多資訊-店家',
      }),
    },
  },
])
