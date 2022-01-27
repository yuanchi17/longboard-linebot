
module.exports = () => ({
  type: 'text',
  text: '你要去哪裡玩！想學學新招嗎？',
  quickReply: {
    items: [
      {
        type: 'action',
        action: {
          data: JSON.stringify(['grounds']),
          type: 'postback',
          label: '玩板場地',
        },
      },
      {
        type: 'action',
        action: {
          data: JSON.stringify(['playList', 'base']),
          type: 'postback',
          label: '基礎教學',
        },
      },
      {
        type: 'action',
        action: {
          data: JSON.stringify(['playList', 'dancing']),
          type: 'postback',
          label: 'Dancing',
        },
      },
      {
        type: 'action',
        action: {
          data: JSON.stringify(['playList', 'freestyle']),
          type: 'postback',
          label: 'Freestyle',
        },
      },
    ],
  },
})
