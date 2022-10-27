const { color } = require('../libs/helpers')

module.exports = () => ({
  type: 'flex',
  altText: '點選下方的主選單可以進行查詢哦～',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'horizontal',
      contents: [{
        type: 'text',
        text: '點選下方的主選單可以進行查詢哦～\n\n有任何問題請點擊下方「讓我來告訴你」，小編將不定時更新資料及修復😄\n\n也歡迎聯絡小編：\nhttps://www.instagram.com/yuanchi_longboard/',
        size: 'sm',
        wrap: true,
      }],
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [{
        color: color.blue,
        height: 'sm',
        style: 'primary',
        type: 'button',
        action: {
          type: 'uri',
          label: '讓我來告訴你',
          uri: 'https://lihi1.cc/q7zVh',
        },
      }],
    },
  },
})
