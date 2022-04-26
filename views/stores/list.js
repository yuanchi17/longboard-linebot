const _ = require('lodash')
const { color } = require('../../libs/helpers')
const quickReply = require('../quickReply')

module.exports = storeCitys => {
  const cityChunks = _.chunk(_.keys(storeCitys), 3)
  return {
    type: 'flex',
    altText: '快來看看這些市區的滑板店家在哪裡吧！',
    contents: {
      type: 'bubble',
      header: {
        backgroundColor: color.blue,
        layout: 'vertical',
        paddingBottom: '8px',
        paddingTop: '8px',
        type: 'box',
        contents: [
          {
            height: '60px',
            layout: 'vertical',
            paddingAll: '8px',
            type: 'box',
            width: '60px',
            contents: [
              {
                type: 'image',
                url: 'https://i.imgur.com/geuwlVu.png',
              },
            ],
          },
          {
            height: '76px',
            layout: 'vertical',
            offsetStart: '90px',
            position: 'absolute',
            type: 'box',
            contents: [
              {
                color: color.white,
                flex: 1,
                gravity: 'center',
                size: 'xl',
                text: '滑板店家',
                type: 'text',
                weight: 'bold',
              },
            ],
          },
        ],
      },
      body: {
        layout: 'vertical',
        spacing: 'md',
        type: 'box',
        contents: [
          ..._.map(cityChunks, citys => ({
            layout: 'horizontal',
            spacing: 'md',
            type: 'box',
            contents: [
              ..._.map(citys, city => ({
                height: 'sm',
                style: 'link',
                type: 'button',
                action: {
                  data: JSON.stringify(['storesDetail', city]),
                  label: city,
                  type: 'postback',
                },
              })),
            ],
          })),
        ],
      },
    },
    quickReply: {
      items: quickReply.shareForm({
        label: '我要提供其他縣市',
        cd: '分享更多資訊-縣市店家',
      }),
    },
  }
}
