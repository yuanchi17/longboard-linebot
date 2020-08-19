// 選擇 Heroku 作為伺服器
const express = require('express') // 伺服器端用的模組
const line = require('@line/bot-sdk')

const _ = require('lodash')
const { getLongboardStores, getPlaygrounds } = require('./getData')
// const flexMsgStores = require('./flexMessage')()

const app = express() // 取得 express 實體
const config = {
  channelId: '1654061086',
  channelSecret: '1c8ef4723f515503e64fffb32592ce3b',
  channelAccessToken: '2p1E0ii7rg0ThEJxfqcOD/6rLfM+BK8uix2W2J4G+ropOhxn8a72/euiCN8TvzweE2dAf8C8RonnfAYFrCAiuvrgJWKLLm1Icc8UvVbcDCq78DCA1OxlipxBEAHsbTJUphMQlfM4rRhm/CgtYcQp5gdB04t89/1O/w1cDnyilFU='
}

// 讀取資料
const getStores = async () => {
  longboardStores = await getLongboardStores()
  playgrounds = await getPlaygrounds()
  storeCitys = _.groupBy(longboardStores, 'city')
  groundCitys = _.groupBy(playgrounds, 'city')
}

getStores()
const client = new line.Client(config);
const handleEvent = event => {
  console.log(event)
  if (event.type !== "message" || event.message.type !== "text") {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '這我看某@@ 請傳送其他文字訊息'
    })
  }

  const message = event.message.text
  if (!_.get(storeCitys, message)) {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: `我沒有${message}的資料哦`
    })
  }

  const stores = _.filter(longboardStores, store => { return store.city === message })
  return client.replyMessage(event.replyToken, exports.flexMsgStores(message, stores))
}

app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => { res.json(result) })
    .catch(err => {
      console.log('err')
      console.log(err)
    })
});

app.listen(process.env.PORT || 3000, async () => {
  console.log('Express server start')
});


const storeDetail = store => ({
  type: "box",
  layout: "vertical",
  margin: "lg",
  spacing: "sm",
  contents: [
    {
      type: "box",
      layout: "baseline",
      spacing: "sm",
      contents: [
        {
          color: "#aaaaaa",
          flex: 1,
          size: "sm",
          text: "店名",
          type: "text",
          wrap: true,
        },
        {
          type: "text",
          text: store.name,
          size: "sm",
          flex: 5
        }
      ]
    },
    {
      type: "box",
      layout: "baseline",
      spacing: "sm",
      contents: [
        {
          color: "#aaaaaa",
          flex: 1,
          size: "sm",
          text: "地址",
          type: "text",
          wrap: true,
        },
        {
          type: "text",
          text: store.address,
          size: "sm",
          flex: 5
        }
      ]
    },
    {
      type: "box",
      layout: "baseline",
      spacing: "sm",
      contents: [
        {
          color: "#aaaaaa",
          flex: 1,
          size: "sm",
          text: "團練",
          type: "text",
          wrap: true,
        },
        {
          type: "text",
          text: _.replace(store.group_activity, ';', '\n'),
          size: "sm",
          flex: 5,
          wrap: true
        }
      ]
    },
    {
      type: "separator",
      margin: "md"
    }
  ]
})

exports.flexMsgStores = (city, stores) => ({
  type: 'flex',
  altText: `我知道${city}有這些板店！提供給你參考參考~`,
  contents: {
    type: "bubble",
    header: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: `${city}-板店`,
          weight: "bold",
          size: "xl",
          color: "#ffffff",
        },
      ],
      backgroundColor: "#98d6ea",
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        ..._.map(stores, storeDetail)
      ]
    }
  }
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
//     group_activity: '禮拜五 20:00 - 23:00(平地);禮拜? ?:?(下坡)'
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
//   { city: '台中', name: '文心秀泰重劃區(金錢豹對面)', address: '' },
//   { city: '台中', name: '台中市政府地下停車場(B2)', address: '' }
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
//   '台中': [
//     { city: '台中', name: '文心秀泰重劃區(金錢豹對面)', address: '' },
//     { city: '台中', name: '台中市政府地下停車場(B2)', address: '' }
//   ]
// }