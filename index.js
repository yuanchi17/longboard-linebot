require('dotenv').config()

const _ = require('lodash')
const { log } = require('./libs/helpers')
const flexText = require('./views/flexText')
const functions = require('@google-cloud/functions-framework')
const Line = require('@line/bot-sdk').Client

const handleEvent = async ctx => {
  const { event, line } = ctx
  const lineId = _.get(event, 'source.userId')
  if (!lineId) return
  let profile
  try { // 封鎖好友會抓不到
    profile = await line.getProfile(event.source.userId)
  } catch (err) {
    log(`無法從 LINE 取得使用者資料, lineId = ${lineId}`)
  }
  switch (event.type) {
    case 'message':
      if (event.message.type === 'text') return await require('./routes/messageText')({ event, line })
      return line.replyMessage(event.replyToken, flexText(`嗨～${profile.displayName}，點選下方的主選單可以進行查詢哦～\n\n有任何問題歡迎聯絡小編：\nhttps://www.instagram.com/yuanchi_longboard/`))
    case 'postback':
      return await require('./routes/postback')({ event, line })
    case 'follow':
      event.gaScreenView('加入好友')
      break
    case 'unfollow':
      event.gaScreenView('封鎖好友')
      break
    default:
      break
  }
}

functions.http('main', async (req, res) => {
  try {
    // 處理 access token
    const channelAccessToken = req.path.substring(1)
    if (!/^[a-zA-Z0-9+/=]+$/.test(channelAccessToken)) throw new Error('invalid channel access token')
    const line = new Line({ channelAccessToken })

    const ctx = { line, req }

    // 處理 events
    const events = _.get(req, 'body.events', [])
    await Promise.all(_.map(events, event => handleEvent({ ...ctx, event })))
    res.status(200).send('OK')
  } catch (err) {
    log('ERROR', err)
    res.status(err.status || 500).send(err.message)
  }
})
