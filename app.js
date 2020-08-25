// 選擇 Heroku 作為伺服器
const express = require('express') // 伺服器端用的模組
const line = require('@line/bot-sdk')

const _ = require('lodash')
const { getLongboardStores, getPlaygrounds } = require('./getData')

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

const client = new line.Client(config);
const notFountMsg = '尋找板店：\n請輸入縣市名稱(ex:台中)，目前的資訊有台中、高雄、屏東\n\n尋找玩板場地：\n請輸入縣市名稱+玩板(ex:台中玩板)，目前的資訊有台中、高雄、基隆'
getStores()

const handleEvent = event => {
  console.log(event)
  if (event.type !== "message" || event.message.type !== "text") {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: `這我看某@@\n\n${notFountMsg}`
    })
  }

  // 沒有此查詢資料
  const msg = event.message.text
  if (!_.get(storeCitys, msg) && !_.get(groundCitys, msg)) {
    return client.replyMessage(event.replyToken, exports.notFound(msg, notFountMsg))
  }

  // 玩板場地
  const reGround = /(.){2}玩板$/
  if (reGround.test(msg)) {
    const grounds = _.get(groundCitys, msg)
    return client.replyMessage(event.replyToken, exports.flexMsg('ground', msg, grounds))
  }

  // 長板店家
  const stores = _.get(storeCitys, msg)
  return client.replyMessage(event.replyToken, exports.flexMsg('store', msg, stores))
}

app.post('/', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => { res.json(result) })
    .catch(err => {
      console.log(err.message)
    })
});

app.listen(process.env.PORT || 3000, async () => {
  console.log('Express server start')
});

exports.notFound = (msg, notFountMsg) => ({
  type: 'flex',
  altText: `抱歉，我沒有「${msg}」的資料哦`,
  contents: {
    type: "bubble",
    body: {
      type: "box",
      layout: "horizontal",
      contents: [{
        type: "text",
        text: `抱歉，我沒有「${msg}」的資料哦\n\n${notFountMsg}`,
        size: "sm",
        wrap: true
      }]
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [{
        color: "#98d6ea",
        height: "sm",
        style: "primary",
        type: "button",
        action: {
          type: "uri",
          label: "我願意提供資訊",
          uri: "https://forms.gle/ZyBcucrQEUMB9RWf8?openExternalBrowser=1"
        },
      }],
    }
  }
})

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
          text: store.address === '' ? '我也不知道在哪裡XD' : store.address,
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
          text: _.replace(store.group_activity, ';', '\n') === '' ? "我不曉得他們的團練時間..." : _.replace(store.group_activity, ';', '\n'),
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

const groundDetail = ground => ({
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
          text: "場地",
          type: "text",
          wrap: true,
        },
        {
          type: "text",
          text: ground.name,
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
          text: "位於",
          type: "text",
          wrap: true,
        },
        {
          type: "text",
          text: ground.address === '' ? '我也不知道在哪裡XD' : ground.address,
          size: "sm",
          flex: 5
        }
      ]
    },
    {
      type: "separator",
      margin: "md"
    }
  ]
})

exports.flexMsg = (type, city, details) => ({
  type: 'flex',
  altText: type === "store" ? `我知道${city}有這些板店！提供給你參考參考～` : `想來${city}嗎？這些場地給你參考參考～`,
  contents: {
    type: "bubble",
    header: {
      type: "box",
      layout: 'vertical',
      backgroundColor: "#98d6ea",
      contents: [{
        type: "text",
        text: type === "store" ? `${city}板店` : city,
        weight: "bold",
        size: "xl",
        color: "#ffffff",
      }],
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        ..._.map(details, type === "store" ? storeDetail : groundDetail)
      ]
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "以上資料僅供參考",
          color: "#aaaaaa",
          align: "center",
          size: "sm"
        }
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