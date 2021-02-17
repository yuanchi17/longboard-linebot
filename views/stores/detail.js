const _ = require('lodash')
const { color, toGoogleMap } = require('../../libs/helpers')

const detail = store => ({
  type: 'box',
  layout: 'vertical',
  margin: 'lg',
  spacing: 'sm',
  contents: [
    {
      type: 'box',
      layout: 'horizontal',
      spacing: 'sm',
      action: {
        label: 'action',
        type: 'uri',
        uri: toGoogleMap(store),
      },
      alignItems: 'flex-start',
      contents: [
        {
          flex: 5,
          text: store.name,
          type: 'text',
          weight: 'bold',
          wrap: true,
        },
        {
          align: 'end',
          aspectMode: 'cover',
          aspectRatio: '1:1',
          flex: 1,
          size: '20px',
          type: 'image',
          url: 'https://i.imgur.com/eKDkkkZ.png',
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
          text: '團練',
          type: 'text',
          wrap: true,
        },
        {
          type: 'text',
          text: _.replace(store.group_activity, /;/g, '\n') === '' ? '我不曉得他們的團練時間' : _.replace(store.group_activity, /;/g, '\n'),
          size: 'sm',
          flex: 5,
          wrap: true,
        },
      ],
    },
    {
      type: 'separator',
      margin: 'md',
    },
  ],
})

module.exports = ({ city, stores }) => ({
  type: 'flex',
  altText: `我知道${city}有這些滑板店！提供給你參考參考～`,
  contents: {
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
      type: 'box',
      layout: 'vertical',
      paddingTop: '1px',
      contents: [
        ..._.map(stores, detail),
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
