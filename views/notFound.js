const { color } = require('../libs/helpers')

module.exports = msg => ({
  type: 'flex',
  altText: '嗨～你說的小編能看到哦，但若想查詢資訊請點選下方的主選單進行查詢。',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'horizontal',
      contents: [{
        type: 'text',
        text: '嗨～你說的小編能看到哦，但若想查詢資訊請點選下方的主選單進行查詢。\n\n若想提供資訊或使用上的疑問，請點擊下方「讓我來告訴你」，小編將不定時更新資料及修復😄',
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
