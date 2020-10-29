const router = require('express').Router()
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')
const apiRouter = require('./apiadvice')

router.get('/', (req, res) =>
  res.status(200).json({ msg: 'fancy todo server' })
)
router.use('/todos', todoRouter)
router.use('/users', userRouter)
router.use('/advice', apiRouter)

module.exports = router
