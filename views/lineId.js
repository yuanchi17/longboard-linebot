'use strict'
const _ = require('lodash')

module.exports = event => require('./text')(_.get(event, 'source.userId'))
