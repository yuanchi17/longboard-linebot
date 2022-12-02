require('dotenv').config()

const _ = require('lodash')
const { log } = require('./libs/helpers')
const functions = require('@google-cloud/functions-framework')
const Ga3Service = require('./services/Ga3Service')
const GaService = require('./services/GaService')
const Line = require('@line/bot-sdk').Client

const handleEvent = async ctx => {
  const { event, line } = ctx
  const lineId = _.get(event, 'source.userId')
  if (!lineId) return
  try { // 封鎖好友會抓不到
    await line.getProfile(event.source.userId)
  } catch (err) {
    log(`無法從 LINE 取得使用者資料, lineId = ${lineId}`)
  }
  Ga3Service.gaTargetByLineId(lineId, event) // GA3
  GaService.gaTargetByLineId(lineId, event) // GA4
  switch (event.type) {
    case 'message':
      if (event.message.type === 'text') return await require('./routes/messageText')({ event, line })
      return line.replyMessage(event.replyToken, require('./views/notFound')())
    case 'postback':
      return await require('./routes/postback')({ event, line })
    case 'follow':
      event.ga3ScreenView('加入好友')
      event.sendGa4({ name: '加入好友' })
      break
    case 'unfollow':
      event.ga3ScreenView('封鎖好友')
      event.sendGa4({ name: '封鎖好友' })
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
