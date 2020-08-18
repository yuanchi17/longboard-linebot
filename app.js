// 選擇 Heroku 作為伺服器
const express = require('express') // 伺服器端用的模組
// const linebot = require('linebot') // (Node.js模組)判別開發環境
const line = require('@line/bot-sdk')

const _ = require('lodash')
const { getLongboardStores, getPlaygrounds } = require('./getData')
const flexMessage = require('./flexMessage')

const app = express() // 取得 express 實體
const config = {
  channelId: '1654061086',
  channelSecret: '1c8ef4723f515503e64fffb32592ce3b',
  channelAccessToken: '2p1E0ii7rg0ThEJxfqcOD/6rLfM+BK8uix2W2J4G+ropOhxn8a72/euiCN8TvzweE2dAf8C8RonnfAYFrCAiuvrgJWKLLm1Icc8UvVbcDCq78DCA1OxlipxBEAHsbTJUphMQlfM4rRhm/CgtYcQp5gdB04t89/1O/w1cDnyilFU='
}

// const getStores = async () => {
//   // 讀取資料
//   const longboardStores = await getLongboardStores()
//   const playgrounds = await getPlaygrounds()
//   const storeCitys = _.groupBy(longboardStores, 'city')
//   const groundCitys = _.groupBy(playgrounds, 'city')

//   bot.on('message', event => {
//     const message = event.message.text
//     switch (message) {
//       case '在測試什麼': event.reply("改用 @line/bot-sdk")
//         break
//       default:
//         if (!_.get(storeCitys, message)) {
//           event.reply(`我沒有${message}的資料哦`)
//           return
//         }
//         const stores = _.filter(longboardStores, store => { return store.city === message })
//         event.reply(_.map(stores, 'name'))
//     }
//   })
// }

// getStores()
const client = new line.Client(config);
const handleEvent = event => {
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: `handleEvent test ${event.message.text}`
  })
}

// const linebotParser = client.parser();
app.post('/', line.middleware(config), (req, res) => {
  console.log('req')
  console.log(req.body)
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => { res.json(result) })
});

app.listen(process.env.PORT || 3000, async () => {
  console.log('Express server start')
});

// 資料範例
// {
//   city: '台中',
//   name: '長樂 Nagaraku Boardshop',
//   address: '台中市西區梅川西路一段118號',
//   group_activity: '禮拜二 20:00 - 23:00;禮拜六 14:00 - 17:00'
// }
// {
//   city: '台中',
//   name: 'Mafia Collective',
//   address: '台中市北區三民路三段89巷32號',
//   group_activity: '禮拜五 20:00 - 23:00(平地);禮拜? ?:?(下坡)'
// }
// { city: '台中', name: '文心秀泰重劃區(金錢豹對面)', address: '' }
// { city: '台中', name: '台中市政府地下停車場(B2)', address: '' }