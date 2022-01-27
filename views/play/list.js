const _ = require('lodash')
const { color } = require('../../libs/helpers')

const QUICK_ACTION = label => ({
  type: 'action',
  action: {
    data: JSON.stringify(['playList', _.toLower(label)]),
    type: 'postback',
    label,
  },
})

const CTX_TYPE = {
  base: {
    altText: '這些是滑板的基礎教學，剛接觸滑板的話要注意安全哦',
    title: '基礎教學',
    quickReply: [
      QUICK_ACTION('Dancing'),
      QUICK_ACTION('Freestyle'),
    ],
  },
  dancing: {
    altText: '快來看看有什麼好看的走板吧！',
    title: 'Dancing',
    quickReply: [QUICK_ACTION('Freestyle')],
  },
  freestyle: {
    altText: '快來看看有什麼好玩的招吧！',
    title: 'Freestyle',
    quickReply: [QUICK_ACTION('Dancing')],
  },
  keyword: {
    altText: '幫你找到相關系列的招式了！',
    title: '相關系列',
    quickReply: [
      QUICK_ACTION('Dancing'),
      QUICK_ACTION('Freestyle'),
    ],
  },
}

module.exports = ({ type, items, keyword }) => {
  const itemChunks = _.chunk(items, 2)
  const ctx = CTX_TYPE[type]
  return [
    {
      align: 'center',
      color: color.gray,
      size: 'sm',
      text: type === 'keyword' ? `這些是跟「${keyword}」有關的招式，點擊看看教學影片吧！` : '請點擊你想學的系列，查看相關的教學影片～',
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
                    text: _.trim(`${item.category_en}\n${item.category_cn}`),
                    type: 'text',
                    wrap: true,
                  }],
                  action: {
                    data: JSON.stringify(['playItems', item]),
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
        items: ctx.quickReply,
      },
    },
  ]
}
