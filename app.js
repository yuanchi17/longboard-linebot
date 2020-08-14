// 選擇 Heroku 作為伺服器
const express = require('express') // 伺服器端用的模組
const linebot = require('linebot') // (Node.js模組)判別開發環境

const _ = require('lodash')
const getData = require('./getData')

if (process.env.NODE_ENV !== 'production') { // 如果不是 production 模式
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const longboardStores = await getData.getCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vT5F5J1G5fZevlcbtjBIiw5U0JgInlV-OBPMzvIkGimzXaizHIaNbw_LfpuR7nW1-7kyDVHKYIV0hOd/pub?gid=0&single=true&output=csv')
const playgrounds = await getData.getCsv('https://docs.google.com/spreadsheets/d/e/2PACX-1vT5F5J1G5fZevlcbtjBIiw5U0JgInlV-OBPMzvIkGimzXaizHIaNbw_LfpuR7nW1-7kyDVHKYIV0hOd/pub?gid=2013906441&single=true&output=csv')
getStores(longboardStores)

express.getStores = (longboardStores) => {
  bot.on('message', event => {
    console.log(event.message.text);
    switch (event.message.text) {
      case '在測試什麼': event.reply("chatbot 回覆台中的店家")
        break
      case '台中': event.reply("台中的長板店有...")
        break
      default:
        event.reply('嗯...讓我想想')
    }
    const stores = _.filter(longboardStores, store => { return store.city === event.message.text })
    event.reply(_.forEach(stores, store => { store.name }))
  })
}

const app = express()
const linebotParser = bot.parser();
app.post('/', linebotParser);

app.listen(process.env.PORT || 3000, async () => {
  console.log('Express server start')
});

// 資料
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