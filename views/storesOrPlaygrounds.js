const _ = require('lodash')
const { color } = require('../libs/helpers')

const storeDetail = store => ({
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

const groundDetail = ground => ({
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

module.exports = (type, city, details) => ({
  type: 'flex',
  altText: type === 'store' ? `我知道${city}有這些板店！提供給你參考參考～` : `想來${city}嗎？這些場地給你參考參考～`,
  contents: {
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: color.blue,
      contents: [{
        type: 'text',
        text: type === 'store' ? `${city}板店` : city,
        weight: 'bold',
        size: 'xl',
        color: color.white,
      }],
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        ..._.map(details, type === 'store' ? storeDetail : groundDetail),
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
