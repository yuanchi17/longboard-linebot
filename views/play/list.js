const _ = require('lodash')
const { color } = require('../../libs/helpers')

module.exports = ({ type, items }) => {
  const itemChunks = _.chunk(items, 2)
  const ctx = type === 'dancing' ? {
    altText: '快來看看有什麼好看的走板吧！',
    title: 'Dancing',
    quickReply: {
      type: 'action',
      action: {
        data: JSON.stringify(['playList', 'freestyle']),
        type: 'postback',
        label: 'Freestyle',
      },
    },
  } : {
    altText: '快來看看有什麼好玩的招吧！',
    title: 'Freestyle',
    quickReply: {
      type: 'action',
      action: {
        data: JSON.stringify(['playList', 'dancing']),
        type: 'postback',
        label: 'Dancing',
      },
    },
  }
  return [
    {
      align: 'center',
      color: color.gray,
      size: 'sm',
      text: '請點擊你想學的系列，查看相關的教學影片～',
      type: 'text',
    },
    {
      type: 'flex',
      altText: ctx.altText,
      contents: {
        type: 'bubble',
        header: {
          backgroundColor: '#98d6ea',
          layout: 'vertical',
          type: 'box',
          contents: [{
            color: '#ffffff',
            size: 'lg',
            text: ctx.title,
            type: 'text',
            weight: 'bold',
            wrap: true,
          }],
        },
        body: {
          layout: 'vertical',
          paddingAll: '0px',
          type: 'box',
          contents: [
            ..._.map(itemChunks, (chunks, row) => ({
              layout: 'horizontal',
              paddingAll: '0px',
              type: 'box',
              contents: [
                ..._.map(chunks, (item, col) => ({
                  alignItems: 'center',
                  backgroundColor: (row + col) % 2 ? '#98d6ea30' : '#ffffff',
                  justifyContent: 'center',
                  layout: 'vertical',
                  paddingAll: '10px',
                  type: 'box',
                  contents: [{
                    align: 'center',
                    text: item.category,
                    type: 'text',
                    wrap: true,
                  }],
                  action: {
                    data: JSON.stringify(['playItem', item]),
                    type: 'postback',
                  },
                })),
              ],
            })),
          ],
        },
        footer: {
          layout: 'vertical',
          spacing: 'sm',
          type: 'box',
          contents: [{
            color: color.blue,
            height: 'sm',
            style: 'primary',
            type: 'button',
            action: {
              type: 'uri',
              label: '我要提供其他系列！',
              uri: 'https://forms.gle/w127WDHjyghppCop6',
            },
          }],
        },
      },
      quickReply: {
        items: [
          ctx.quickReply,
        ],
      },
    },
  ]
}
