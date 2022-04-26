const { color } = require('../libs/helpers')
const quickReply = require('./quickReply')

const detail = board => ({
  type: 'bubble',
  hero: (board.image ? {
    layout: 'vertical',
    type: 'box',
    contents: [
      {
        aspectMode: 'cover',
        aspectRatio: '20:13',
        size: 'full',
        type: 'image',
        url: board.image,
      },
      { // 底色
        backgroundColor: '#ffffff90',
        height: '100%',
        layout: 'vertical',
        position: 'absolute',
        type: 'box',
        width: '100%',
        contents: [
          {
            type: 'filler',
          },
        ],
      },
      {
        aspectMode: 'fit',
        aspectRatio: '20:13',
        position: 'absolute',
        size: 'full',
        type: 'image',
        url: board.image,
      },
    ],
  } : {
    aspectMode: 'fit',
    aspectRatio: '20:13',
    backgroundColor: '#98d6ea',
    size: 'full',
    type: 'image',
    url: 'https://i.imgur.com/N5MPTcY.png',
  }),
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
    items: quickReply.shareForm({
      label: '我要補充介紹',
      cd: '分享更多資訊-種類介紹',
    }),
  },
})
