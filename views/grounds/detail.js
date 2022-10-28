const _ = require('lodash')
const { color, toGoogleMap, toRedirectGaUrl } = require('../../libs/helpers')
const quickReply = require('../quickReply')

const getBox = ground => ({
  flex: 7,
  justifyContent: 'center',
  layout: 'vertical',
  spacing: 'sm',
  type: 'box',
  contents: [
    {
      text: ground.name,
      type: 'text',
      weight: 'bold',
      wrap: true,
    },
    ...(ground.ps ? [{
      color: color.gray,
      size: 'xs',
      text: ground.ps,
      type: 'text',
      wrap: true,
    }] : []),
  ],
})

exports.bubble = ({ city, grounds }) => ({
  type: 'bubble',
  header: {
    type: 'box',
    layout: 'vertical',
    backgroundColor: color.blue,
    contents: [{
      type: 'text',
      text: `${city}玩板`,
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
      ..._.map(grounds, ground => ({
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
            action: {
              label: 'action',
              type: 'uri',
              uri: toRedirectGaUrl({
                u: toGoogleMap(ground),
                cd: '查看玩板場地位置',
                ec: '查看玩板場地位置',
                ea: city,
                el: ground.name,
              }),
            },
            contents: [
              getBox(ground),
              {
                align: 'end',
                aspectMode: 'cover',
                aspectRatio: '1:1',
                gravity: 'center',
                size: '20px',
                type: 'image',
                url: 'https://i.imgur.com/eKDkkkZ.png',
              },
            ],
          },
        ],
      })),
    ],
  },
})

exports.main = ({ city, grounds }) => ([
  {
    type: 'text',
    text: '點擊下方想去的玩板地點，立刻打開 Google 地圖帶你去！',
  },
  {
    type: 'flex',
    altText: `想來${city}玩板嗎？這些場地給你參考參考～`,
    contents: exports.bubble({ city, grounds }),
    quickReply: {
      items: quickReply.shareForm({
        label: '我知道其他地方',
        cd: '分享更多資訊-玩板場地',
      }),
    },
  },
])
