const _ = require('lodash')
const { SearchPlayItemsByKeyword, SearchGroundsAndStoresByKeyword } = require('../libs/helpers')

/**
 * 關鍵字處理的函式，訊息必須完全相同才處理
 */
const keyword = {}

keyword['主選單-我想玩板'] = require('./postback/play')
keyword['主選單-滑板店家'] = require('./postback/stores')
keyword['主選單-種類介紹'] = require('./postback/boardType')

module.exports = async ({ event, line }) => {
  const text = event.message.text
  if (keyword[text]) return await keyword[text]({ event, line })

  if (text === '/lineid') {
    event.ga3ScreenView('查詢 LINE ID')
    event.sendGa4({ name: 'line_oa', params: { type: '查詢 LINE ID' } })
    return await line.replyMessage(event.replyToken, require('../views/flexText')(_.get(event, 'source.userId')))
  }

  // 關鍵字查招式
  const items = await SearchPlayItemsByKeyword(text)
  if (items.length) return require('./postback/playListByKeyword')({ event, line, items, keyword: text })

  // 關鍵字查縣市資訊
  const cityItems = await SearchGroundsAndStoresByKeyword(text)
  if (cityItems?.grounds || cityItems?.stores) {
    return require('./postback/groundsAndStoresByKeyword')({
      ctx: cityItems,
      event,
      line,
    })
  }

  // 沒有此查詢資料
  event.ga3ScreenView('未知訊息')
  event.ga3EventLabel('未知訊息', '未知訊息', text)
  event.sendGa4({
    name: 'line_oa',
    params: {
      type: '未知訊息',
      undefind_msg: text,
    },
  })
  await line.replyMessage(event.replyToken, require('../views/notFound')())
}
