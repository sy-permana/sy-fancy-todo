const router = require('express').Router()
const Controller = require('../controllers/ApiController.js')

router.get('/', Controller.getRandom)

module.exports = router
