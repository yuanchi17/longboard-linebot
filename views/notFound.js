module.exports = msg => ({
  type: 'flex',
  altText: `抱歉，我沒有「${msg}」的資料哦`,
  contents: {
    type: "bubble",
    body: {
      type: "box",
      layout: "horizontal",
      contents: [{
        type: "text",
        text: `抱歉，我沒有「${msg}」的資料哦\n\n尋找板店：\n請輸入縣市名稱(ex:台中)，目前的資訊有台中、高雄、屏東\n\n尋找玩板場地：\n請輸入縣市名稱+玩板(ex:台中玩板)，目前的資訊有台中、高雄、基隆`,
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