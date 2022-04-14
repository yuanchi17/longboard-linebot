const { errToPlainObj } = require('../../libs/helpers')
const express = require('express')
// const log = require('../../libs/log')(__filename)

const router = express.Router()

const LIFF_GET_HANDLERS = {
  // 送出 GA 後跳轉
  'redirect-ga': async (req, res) => {
    res.render('redirect-ga')
  },
}

router.use('/', async (req, res, next) => {
  try {
    const path = new URL(req.url, 'https://localhost').pathname.slice(1)
    if (LIFF_GET_HANDLERS[path]) return await LIFF_GET_HANDLERS[path](req, res)
    return res.render('endpoint')
  } catch (err) {
    console.log('%j', errToPlainObj(err))
    next(err)
  }
})

module.exports = router
