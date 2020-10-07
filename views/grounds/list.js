const _ = require('lodash')
const { color } = require('../../libs/helpers')

module.exports = groundCitys => {
  const cityChunks = _.chunk(_.keys(groundCitys), 3)
  return {
    type: 'flex',
    altText: '快來看看這些市區哪裡可以玩板吧！',
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
                url: 'https://i.imgur.com/iWD2F5o.png',
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
                text: '玩板場地',
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
        paddingBottom: '0px',
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
                  label: city,
                  text: `${city}玩板`,
                  type: 'message',
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
            text: '什麼！你還知道更多地方？',
            type: 'text',
          },
          {
            color: color.blue,
            height: 'sm',
            style: 'primary',
            type: 'button',
            action: {
              type: 'uri',
              label: '哈 讓我來告訴你吧',
              uri: 'https://forms.gle/ZyBcucrQEUMB9RWf8?openExternalBrowser=1',
            },
          },
        ],
      },
    },
  }
}
