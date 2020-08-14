// 選擇 Heroku 作為伺服器
const express = require('express') // 伺服器端用的模組
const linebot = require('linebot') // (Node.js模組)判別開發環境

const _ = require('lodash')
const { getLongboardStores, getPlaygrounds } = require('./getData')

if (process.env.NODE_ENV !== 'production') { // 如果不是 production 模式
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const getStores = async () => {
  // 讀取資料
  const longboardStores = await getLongboardStores()
  const playgrounds = await getPlaygrounds()
  const storeCitys = _.groupBy(longboardStores, 'city')
  const groundCitys = _.groupBy(playgrounds, 'city')

  bot.on('message', event => {
    const message = event.message.text
    switch (message) {
      case '在測試什麼': event.reply("回覆該縣市有的長板店家")
        break
      default:
        if (!_.get(storeCitys, message)) {
          event.reply(`我沒有${message}的資料哦`)
          return
        }
        const stores = _.filter(longboardStores, store => { return store.city === message })
        event.reply(_.map(stores, 'name'))
    }
  })
}

getStores()

const app = express()
const linebotParser = bot.parser();
app.post('/', linebotParser);

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