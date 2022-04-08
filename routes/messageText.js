const { client } = require('../libs/lineat')
const { SearchPlayItemsByKeyword, SearchGroundsAndStoresByKeyword } = require('../libs/helpers')

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

  if (text === '/lineid') {
    event.gaScreenView('查詢 LINE ID')
    return await client.replyMessage(event.replyToken, require('../views/flexText')())
  }

  // 關鍵字查招式
  const items = await SearchPlayItemsByKeyword(text)
  if (items.length) return require('./postback/playListByKeyword')({ event, items, keyword: text })

  // 關鍵字查縣市資訊
  const cityItems = await SearchGroundsAndStoresByKeyword(text)
  if (cityItems?.grounds || cityItems?.stores) return require('./postback/groundsAndStoresByKeyword')({ event, items: cityItems, keyword: text })

  // 沒有此查詢資料
  event.gaScreenView('未知訊息')
  event.gaEventLabel('未知訊息', '未知訊息', text)
  await client.replyMessage(event.replyToken, require('../views/notFound')(text))
}
