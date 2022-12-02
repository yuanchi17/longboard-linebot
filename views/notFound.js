const { color } = require('../libs/helpers')

module.exports = () => ({
  type: 'flex',
  altText: '嘿！你有話想對小編說嗎？有任何問題歡迎直接提出，小編看到會立即回覆的！',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'horizontal',
      contents: [{
        type: 'text',
        text: '嘿！你有話想對小編說嗎？有任何問題歡迎直接提出，小編看到會立即回覆的！\n\n貼心提醒：點選下方的主選單可以進行查詢哦～',
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
