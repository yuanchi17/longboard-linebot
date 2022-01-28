const { color } = require('../libs/helpers')
const quickReply = require('./quickReply')

const detail = board => ({
  type: 'bubble',
  ...(board.image ? {
    hero: {
      type: 'image',
      url: board.image,
      aspectRatio: '20:13',
      aspectMode: 'cover',
      size: 'full',
    },
  } : {}),
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: board.name,
        weight: 'bold',
        size: 'xl',
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'md',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: `板身約 ${board.length} 吋`,
                wrap: true,
                color: color.gray,
                size: 'sm',
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
                text: '優點',
                type: 'text',
                wrap: true,
              },
              {
                flex: 5,
                size: 'sm',
                text: board.feature,
                type: 'text',
                wrap: true,
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
                text: '玩法',
                type: 'text',
                wrap: true,
              },
              {
                flex: 5,
                size: 'sm',
                text: board.play_type,
                type: 'text',
                wrap: true,
              },
            ],
          },
        ],
      },
    ],
  },
})

module.exports = boards => ({
  type: 'flex',
  altText: '種類介紹',
  contents: {
    type: 'carousel',
    contents: [
      ...boards.map(detail),
    ],
  },
  quickReply: {
    items: quickReply.shareForm('我要補充介紹'),
  },
})
