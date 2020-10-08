const _ = require('lodash')
const { color } = require('../../libs/helpers')

const detail = ground => ({
  type: 'box',
  layout: 'vertical',
  margin: 'lg',
  spacing: 'sm',
  contents: [
    {
      type: 'box',
      layout: 'baseline',
      spacing: 'sm',
      contents: [
        {
          color: color.gray,
          flex: 1,
          size: 'sm',
          text: '場地',
          type: 'text',
          wrap: true,
        },
        {
          type: 'text',
          text: ground.name,
          size: 'sm',
          flex: 5,
        },
      ],
    },
    {
      type: 'box',
      layout: 'baseline',
      spacing: 'sm',
      contents: [
        {
          color: color.gray,
          flex: 1,
          size: 'sm',
          text: '位於',
          type: 'text',
          wrap: true,
        },
        {
          type: 'text',
          text: ground.address === '' ? '我也不知道在哪裡XD' : ground.address,
          size: 'sm',
          flex: 5,
        },
      ],
    },
    {
      type: 'separator',
      margin: 'md',
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
