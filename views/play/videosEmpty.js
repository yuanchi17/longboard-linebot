const _ = require('lodash')
const { color } = require('../../libs/helpers')

module.exports = item => {
  item.category = _.trim(`${item.category_en} ${item.category_cn}`)
  return {
    type: 'flex',
    altText: `抱歉，目前沒有「${item.category}」的教學影片QQ`,
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'horizontal',
        contents: [{
          type: 'text',
          text: `抱歉，目前沒有「${item.category}」的教學影片😓\n\n若你有相關資訊，歡迎點擊下方「讓我來告訴你」，小編將不定時更新資料😄`,
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
  }
}
