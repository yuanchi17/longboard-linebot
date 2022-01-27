const _ = require('lodash')
const { color, toGoogleMap } = require('../../libs/helpers')

const getBox = ground => ({
  flex: 5,
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

module.exports = ({ city, grounds }) => ({
  type: 'flex',
  altText: `想來${city}玩板嗎？這些場地給你參考參考～`,
  contents: {
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
      paddingTop: '5px',
      type: 'box',
      contents: [
        ..._.map(grounds, ground => ({
          layout: 'vertical',
          type: 'box',
          contents: [
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
                uri: toGoogleMap(ground),
              },
              contents: [
                getBox(ground),
                {
                  aspectMode: 'cover',
                  aspectRatio: '1:1',
                  gravity: 'center',
                  size: '20px',
                  type: 'image',
                  url: 'https://i.imgur.com/eKDkkkZ.png',
                },
              ],
            },
            {
              margin: 'md',
              type: 'separator',
            },
          ],
        })),
      ],
    },
  },
  quickReply: {
    items: [{
      type: 'action',
      action: {
        uri: 'https://forms.gle/w127WDHjyghppCop6',
        type: 'uri',
        label: '我知道其他地方',
      },
    }],
  },
})
