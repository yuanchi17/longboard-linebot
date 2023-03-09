const { color } = require('../../libs/helpers')
const quickReply = require('../quickReply')

module.exports = () => {
  return [
    {
      type: 'flex',
      altText: '快來看看有哪些地方可以玩板吧！',
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
          type: 'box',
          contents: [
            {
              size: 'md',
              text: '小邊收集了一些板點放在 Google 地圖的清單上，喜歡的話可以追蹤，有更棒的板點也歡迎大家分享！',
              type: 'text',
              wrap: true,
            },
          ],
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
            {
              color: color.blue,
              height: 'sm',
              style: 'primary',
              type: 'button',
              action: {
                type: 'uri',
                label: '查看板點地圖',
                uri: 'https://goo.gl/maps/ruqNbRpEakiqgVNF6',
              },
            },
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
