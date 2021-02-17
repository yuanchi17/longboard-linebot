const _ = require('lodash')
const { color, toGoogleMap } = require('../../libs/helpers')

const detail = ground => ({
  type: 'box',
  layout: 'horizontal',
  action: {
    label: 'action',
    type: 'uri',
    uri: toGoogleMap(ground),
  },
  contents: [
    {
      size: 'sm',
      text: ground.name,
      type: 'text',
      wrap: true,
    },
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
      type: 'box',
      layout: 'vertical',
      spacing: 'lg',
      contents: [
        ..._.map(grounds, detail),
      ],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '以上資料僅供參考',
          color: color.gray,
          align: 'center',
          size: 'sm',
        },
      ],
    },
  },
})
