const { color } = require('../libs/helpers')

module.exports = msg => ({
  type: 'flex',
  altText: `抱歉，我沒有「${msg}」的資料哦`,
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'horizontal',
      contents: [{
        type: 'text',
        text: `抱歉，我沒有「${msg}」的資料哦😓\n\n請點選下方的主選單進行查詢，若想提供更多資訊，請點擊下方「讓我來告訴你」，小編將不定時更新資料😄`,
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
          uri: 'https://forms.gle/ZyBcucrQEUMB9RWf8?openExternalBrowser=1',
        },
      }],
    },
  },
})
