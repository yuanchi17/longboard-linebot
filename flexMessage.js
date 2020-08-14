exports.stores = () => ({
  type: "bubble",
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: "台中-板店",
        weight: "bold",
        size: "xl"
      },
      {
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
                type: "text",
                text: "店名",
                wrap: true,
                size: "sm",
                flex: 1
              },
              {
                type: "text",
                text: "長樂",
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
                text: "地址",
                wrap: true,
                size: "sm",
                flex: 1
              },
              {
                type: "text",
                text: "台中市西區梅川西路一段118號",
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
                text: "團練",
                wrap: true,
                size: "sm",
                flex: 1
              },
              {
                type: "text",
                text: "禮拜二 20:00 - 23:00\n禮拜六 14:00 - 17:00",
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
      },
      {
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
                type: "text",
                text: "店名",
                wrap: true,
                size: "sm",
                flex: 1
              },
              {
                type: "text",
                text: "Mafia Collective",
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
                text: "地址",
                wrap: true,
                size: "sm",
                flex: 1
              },
              {
                type: "text",
                text: "台中市北區三民路三段89巷32號",
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
                text: "團練",
                wrap: true,
                size: "sm",
                flex: 1
              },
              {
                type: "text",
                text: "禮拜五 20:00 - 23:00(平地)\n禮拜? ?:?(下坡)",
                size: "sm",
                flex: 5,
                wrap: true
              }
            ]
          }
        ]
      }
    ]
  }
})