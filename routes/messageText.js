const { client } = require('../libs/lineat')

/**
 * 關鍵字處理的函式，訊息必須完全相同才處理
 */
const keyword = {}

keyword['主選單-我想玩板'] = require('./postback/play')
keyword['主選單-滑板店家'] = require('./postback/stores')
keyword['主選單-種類介紹'] = require('./postback/boardType')

module.exports = async ({ event, app }) => {
  const text = event.message.text
  if (keyword[text]) return await keyword[text]({ event, app })
  // 沒有此查詢資料
  await client.replyMessage(event.replyToken, require('../views/notFound')(text))
}
