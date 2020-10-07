const _ = require('lodash')
const { color } = require('../../libs/helpers')

const detail = store => ({
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
          text: '店名',
          type: 'text',
          wrap: true,
        },
        {
          type: 'text',
          text: store.name,
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
          text: '地址',
          type: 'text',
          wrap: true,
        },
        {
          type: 'text',
          text: store.address === '' ? '我不知道確切位置' : store.address,
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
          text: '團練',
          type: 'text',
          wrap: true,
        },
        {
          type: 'text',
          text: _.replace(store.group_activity, /;/g, '\n') === '' ? '我不曉得他們的團練時間' : _.replace(store.group_activity, ';', '\n'),
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

module.exports = (city, storeCitys) => ({
  type: 'flex',
  altText: `我知道${city}有這些板店！提供給你參考參考～`,
  contents: {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: color.blue,
      contents: [{
        type: 'text',
        text: `${city}板店`,
        weight: 'bold',
        size: 'xl',
        color: color.white,
      }],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        ..._.map(_.get(storeCitys, city), detail),
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
