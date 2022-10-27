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
        text: '點選下方的主選單可以進行查詢哦～\n\n有任何問題也歡迎提出，小編將不定時更新資料及修復😄',
        size: 'sm',
        wrap: true,
      }],
    },
    footer: {
      layout: 'horizontal',
      spacing: 'md',
      type: 'box',
      contents: [
        {
          color: color.blue,
          height: 'sm',
          style: 'primary',
          type: 'button',
          action: {
            type: 'uri',
            label: '小編 IG',
            uri: 'https://www.instagram.com/yuanchi_longboard/',
          },
        },
        {
          color: color.blue,
          height: 'sm',
          style: 'primary',
          type: 'button',
          action: {
            type: 'uri',
            label: '回饋表單',
            uri: 'https://lihi1.cc/q7zVh',
          },
        }],
    },
  },
})
