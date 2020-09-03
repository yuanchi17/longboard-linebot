const detail = typeDetail => ({
  type: "bubble",
  hero: {
    type: "image",
    url: typeDetail.image,
    aspectRatio: "20:13",
    aspectMode: "cover",
    size: "full"
  },
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: typeDetail.name,
        weight: "bold",
        size: "xl"
      },
      {
        type: "box",
        layout: "vertical",
        margin: "lg",
        spacing: "md",
        contents: [
          {
            type: "box",
            layout: "baseline",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: `板身約 ${typeDetail.length} 吋`,
                wrap: true,
                color: "#666666",
                size: "sm"
              }
            ]
          },
          {
            type: "box",
            layout: "baseline",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "優點：",
                color: "#666666",
                size: "sm",
                flex: 1
              },
              {
                type: "text",
                text: typeDetail.feature,
                wrap: true,
                color: "#666666",
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
                type: "text",
                text: "玩法：",
                wrap: true,
                color: "#666666",
                size: "sm",
                flex: 1
              },
              {
                type: "text",
                text: typeDetail.play_type,
                wrap: true,
                color: "#666666",
                size: "sm",
                flex: 5
              }
            ]
          }
        ]
      }
    ]
  }
})

module.exports = typeDetails => ({
  type: 'flex',
  altText: '種類介紹',
  contents: {
    type: 'carousel',
    contents: [
      ...typeDetails.map(detail)
    ]
  }
})