const _ = require('lodash')
const { color } = require('../../libs/helpers')

module.exports = ({ type, items }) => {
  const itemChunks = _.chunk(items, 3)
  const ctx = type === 'dancing' ? {
    altText: '快來看看有什麼好看的走板吧！',
    title: 'Dancing',
  } : {
    altText: '快來看看有什麼好玩的招吧！',
    title: 'Freestyle',
  }
  return {
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
        spacing: 'md',
        type: 'box',
        paddingBottom: '0px',
        contents: [
          ..._.map(itemChunks, chunks => ({
            layout: 'horizontal',
            spacing: 'md',
            type: 'box',
            contents: [
              ..._.map(chunks, item => ({
                height: 'sm',
                style: 'link',
                type: 'button',
                adjustMode: 'shrink-to-fit', // TODO: 不要用這個，但文字大小要調整
                action: {
                  data: JSON.stringify(['playItems', item]),
                  label: item.name,
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
        contents: [
          {
            align: 'center',
            color: color.gray,
            size: 'sm',
            text: '什麼！你還知道其他的？',
            type: 'text',
          },
          {
            color: color.blue,
            height: 'sm',
            style: 'primary',
            type: 'button',
            action: {
              type: 'uri',
              label: '哈 讓我來告訴你！',
              uri: 'https://lihi1.cc/q7zVh',
            },
          },
        ],
      },
    },
  }
}
