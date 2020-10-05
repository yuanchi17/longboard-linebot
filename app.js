require('dotenv').config() // process.env

// 選擇 Heroku 作為伺服器
const express = require('express') // 伺服器端用的模組
const line = require('@line/bot-sdk')

const _ = require('lodash')
const { getenv } = require('./libs/helpers')
const { getLongboardStores, getPlaygrounds, getTypeDetail } = require('./getData')
const boardType = require('./views/boardType')
const flexText = require('./views/flexText')
const notFound = require('./views/notFound')
const richmenuAction = require('./views/richmenuAction')
const storesOrPlaygrounds = require('./views/storesOrPlaygrounds')

const app = express() // 取得 express 實體
const config = {
  channelId: getenv('LINE_CHANNEL_ID'),
  channelSecret: getenv('LINE_CHANNEL_SECRET'),
  channelAccessToken: getenv('LINE_CHANNEL_ACCESSTOKEN'),
}

// 讀取資料
const getStores = async () => {
  app.locals.longboardStores = await getLongboardStores()
  app.locals.playgrounds = await getPlaygrounds()
  app.locals.typeDetails = await getTypeDetail()
  app.locals.storeCitys = _.groupBy(app.locals.longboardStores, 'city')
  app.locals.groundCitys = _.groupBy(app.locals.playgrounds, 'city')
}

const richmenuActionType = {
  滑板店家: {
    citys: _.keys(app.locals.storeCitys),
    image: 'https://i.imgur.com/geuwlVu.png',
  },
  玩板場地: {
    citys: _.map(_.keys(app.locals.groundCitys), c => { return _.replace(c, '玩板', '') }),
    image: 'https://i.imgur.com/iWD2F5o.png',
  },
}

const client = new line.Client(config)

const handleEvent = async event => {
  console.log(event)
  let msg
  const profile = await client.getProfile(event.source.userId)
  const stores = _.get(app.locals.storeCitys, msg)
  const reGround = /(.){2}玩板$/
  switch (event.type) {
    case 'follow':
      return client.replyMessage(event.replyToken, flexText(`Hi~${profile.displayName}！\n這是一個嘗試創建 chatbot 的小作品，主要目的為推廣長板運動\n\n試著傳送「台中」，看看台中有哪些滑板店吧！`))

    case 'message':
      msg = event.message.text
      if (event.message.type !== 'text') {
        return client.replyMessage(event.replyToken, flexText('這我看某QQ'))
      }

      // 主選單的按鈕
      if (msg === '種類介紹') return client.replyMessage(event.replyToken, boardType(app.locals.typeDetails))
      if (_.get(richmenuActionType, msg)) {
        const allCitys = [[]]
        for (const city of richmenuActionType[msg].citys) {
          for (const i in allCitys) {
            allCitys[i].push(allCitys[i].length < 3 ? city : [city])
          }
        }
        richmenuActionType[msg].citys = allCitys
        return client.replyMessage(event.replyToken, richmenuAction({ title: msg, type: richmenuActionType[msg] }))
      }

      // 沒有此查詢資料
      if (!_.get(app.locals.storeCitys, msg) && !_.get(app.locals.groundCitys, msg)) return client.replyMessage(event.replyToken, notFound(msg))
      // 玩板場地
      if (reGround.test(msg)) {
        const grounds = _.get(app.locals.groundCitys, msg)
        return client.replyMessage(event.replyToken, storesOrPlaygrounds('ground', msg, grounds))
      }
      // 長板店家
      return client.replyMessage(event.replyToken, storesOrPlaygrounds('store', msg, stores))

    default:
      break
  }
}

app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => { res.json(result) })
    .catch(err => {
      console.log(err)
    })
})

app.listen(process.env.PORT || 3000, async () => {
  await getStores()
  console.log('Express server start')
})

// 資料範例
// longboardStores
// [
//   {
//     city: '台中',
//     name: '長樂 Nagaraku Boardshop',
//     address: '台中市西區梅川西路一段118號',
//     group_activity: '禮拜二 20:00 - 23:00;禮拜六 14:00 - 17:00'
//   },
//   {
//     city: '台中',
//     name: 'Mafia Collective',
//     address: '台中市北區三民路三段89巷32號',
//     group_activity: '禮拜五 20:00 - 23:00'
//   },
//   {
//     city: '高雄',
//     name: 'ALIVE Xsports Skateshop',
//     address: '高雄市新興區玉竹一街17巷7號',
//     group_activity: ''
//   },
//   {
//     city: '高雄',
//     name: 'Harbor港',
//     address: '高雄市鼓山區臨海一路16號',
//     group_activity: ''
//   }
// ]

// playgrounds
// [
//   { city: '台中玩板', name: '文心秀泰', address: '文心秀泰重劃區(金錢豹對面)' },
//   { city: '台中玩板', name: 'B2', address: '台中市政府地下停車場(B2)' },
//   { city: '台中玩板', name: '廣福橋下', address: '廣福橋下籃球場' },
//   { city: '台中玩板', name: '台中公園', address: '台中公園光復國小操場' },
//   { city: '台中玩板', name: '精武橋下', address: '精武車站旁邊橋下' },
//   { city: '台中玩板', name: '台鐵橋下', address: '南京東路與興進路交叉口' },
//   { city: '高雄玩板', name: '凹子底', address: '高雄市鼓山區明誠三路588號' },
//   { city: '高雄玩板', name: '科工館', address: '' },
//   { city: '高雄玩板', name: '十全立體停車場', address: '' },
// ]

// storeCitys
// {
//   '台中': [
//     {
//       city: '台中',
//       name: '長樂 Nagaraku Boardshop',
//       address: '台中市西區梅川西路一段118號',
//       group_activity: '禮拜二 20:00 - 23:00;禮拜六 14:00 - 17:00'
//     },
//     {
//       city: '台中',
//       name: 'Mafia Collective',
//       address: '台中市北區三民路三段89巷32號',
//       group_activity: '禮拜五 20:00 - 23:00(平地);禮拜? ?:?(下坡)'
//     }
//   ],
//   '高雄': [
//     {
//       city: '高雄',
//       name: 'ALIVE Xsports Skateshop',
//       address: '高雄市新興區玉竹一街17巷7號',
//       group_activity: ''
//     },
//     {
//       city: '高雄',
//       name: 'Harbor港',
//       address: '高雄市鼓山區臨海一路16號',
//       group_activity: ''
//     }
//   ]
// }

// groundCitys
// {
//   '台中玩板': [
//     { city: '台中玩板', name: '文心秀泰', address: '文心秀泰重劃區(金錢豹對面)' },
//     { city: '台中玩板', name: 'B2', address: '台中市政府地下停車場(B2)' },
//     { city: '台中玩板', name: '廣福橋下', address: '廣福橋下籃球場' },
//     { city: '台中玩板', name: '台中公園', address: '台中公園光復國小操場' },
//     { city: '台中玩板', name: '精武橋下', address: '精武車站旁邊橋下' },
//     { city: '台中玩板', name: '台鐵橋下', address: '南京東路與興進路交叉口' }
//   ],
//   '高雄玩板': [
//     { city: '高雄玩板', name: '凹子底', address: '高雄市鼓山區明誠三路588號' },
//     { city: '高雄玩板', name: '科工館', address: '' },
//     { city: '高雄玩板', name: '十全立體停車場', address: '' }
//   ],
// }
