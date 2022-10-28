const _ = require('lodash')
const { color } = require('../../libs/helpers')
const quickReply = require('../quickReply')

module.exports = groundCitys => {
  const cityChunks = _.chunk(_.keys(groundCitys), 3)
  return [
    {
      type: 'text',
      text: '請點擊下方想去的縣市～',
    },
    {
      type: 'flex',
      altText: '快來看看這些地區有哪裡可以玩板吧！',
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
                    data: JSON.stringify(['groundsDetail', city]),
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
          cd: '分享更多資訊-縣市玩板場地',
        }),
      },
    },
  ]
}
