const express = require('express')

const router = express.Router()

router.use('/workspace', require('./workspace.js'))

module.exports = router; 