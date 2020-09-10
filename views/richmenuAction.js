const _ = require('lodash')

module.exports = ({ title, type }) => ({
  type: 'flex',
  altText: title === '滑板店家' ? `快來看看這些市區的滑板店家在哪裡吧！` : `快來看看這些市區哪裡可以玩板吧！`,
  contents: {
    type: 'bubble',
    header: {
      backgroundColor: '#98d6ea',
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
              url: type.image,
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
              color: '#ffffff',
              flex: 1,
              gravity: 'center',
              size: 'xl',
              text: title,
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
        ..._.map(type.citys, citys => ({
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
                text: title === '滑板店家' ? city : `${city}+玩板`,
                type: 'message',
              },
            }))
          ],
        }))
      ],
    },
  }
})