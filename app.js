const express = require('express')
const app = express()
const linebot = require('linebot'); // 判別開發環境

if (process.env.NODE_ENV !== 'production') { // 如果不是 production 模式
  require('dotenv').config() // 使用 dotenv 讀取 .env 檔案
}

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const linebotParser = bot.parser();
bot.on('message', event => {
  console.log(event);
  switch (event.message.text) {
    case '測試': event.reply("恭喜你測試成功！！！")
      break
    default:
      event.reply('嗯...讓我想想')
  }
});
app.post('/', linebotParser);
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server start')
});