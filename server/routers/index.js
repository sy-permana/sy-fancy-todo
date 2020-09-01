const router = require('express').Router();
const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');

router.get('/', (req, res) => res.status(200).json({ msg: "home fancytodo" }))
router.use('/todos', todoRouter);
router.use('/users', userRouter);

module.exports = router;