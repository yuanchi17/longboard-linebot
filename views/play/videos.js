const _ = require('lodash')
const { color } = require('../../libs/helpers')

const ICON = {
  youtube: 'UokVIEJ',
  instagram: 'swdCwTM',
}

module.exports = ({ item, videos }) => {
  item = { ...item, category: _.trim(`${item.category_en}\n${item.category_cn}`) }
  const videosChunks = _.take(_.chunk(videos, 4), 11) // Flex carousel 最多 12 個
  return {
    type: 'flex',
    altText: `這些是 ${item.category} 的教學影片`,
    contents: {
      type: 'carousel',
      contents: [
        ...(_.map(videosChunks, chunk => ({
          type: 'bubble',
          body: {
            layout: 'vertical',
            paddingAll: '0px',
            type: 'box',
            contents: _.map(chunk, (video, i) => ({
              layout: 'horizontal',
              paddingAll: '15px',
              backgroundColor: i % 2 ? '#98d6ea30' : '#ffffff',
              type: 'box',
              action: {
                type: 'uri',
                uri: video.url,
              },
              contents: [
                {
                  flex: 5,
                  layout: 'vertical',
                  spacing: 'sm',
                  type: 'box',
                  contents: [
                    {
                      color: '#333333',
                      flex: 1,
                      text: video.title,
                      type: 'text',
                      wrap: true,
                    },
                    {
                      color: '#666666',
                      flex: 5,
                      size: 'xs',
                      text: video.owner,
                      type: 'text',
                      wrap: true,
                    },
                  ],
                },
                {
                  aspectRatio: '1:1',
                  flex: 1,
                  gravity: 'center',
                  size: '20px',
                  type: 'image',
                  url: `https://i.imgur.com/${ICON[video.type]}.png`,
                },
              ],
            })),
          },
          header: {
            backgroundColor: '#98d6ea',
            layout: 'vertical',
            type: 'box',
            contents: [{
              color: '#ffffff',
              size: 'lg',
              text: item.category,
              type: 'text',
              weight: 'bold',
              wrap: true,
            }],
          },
        }))),
        { // 表單
          type: 'bubble',
          body: {
            justifyContent: 'center',
            layout: 'vertical',
            paddingAll: '15px',
            spacing: 'md',
            type: 'box',
            contents: [
              {
                text: '小邊將不定期更新哦！',
                type: 'text',
                wrap: true,
                align: 'center',
              },
              {
                color: color.blue,
                height: 'sm',
                style: 'primary',
                type: 'button',
                action: {
                  label: '我要提供',
                  type: 'uri',
                  uri: 'https://forms.gle/w127WDHjyghppCop6',
                },
              },
            ],
          },
          header: {
            backgroundColor: '#98d6ea',
            layout: 'vertical',
            type: 'box',
            contents: [
              {
                color: '#ffffff',
                size: 'lg',
                text: '歡迎提供更多教學影片～',
                type: 'text',
                weight: 'bold',
                wrap: true,
              },
            ],
          },
        },
      ],
    },
  }
}
