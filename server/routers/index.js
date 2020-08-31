const router = require('express').Router();
const todoRouter = require('./todoRouter');

router.get('/', (req, res) => res.status(200).json({ msg: "home fancytodo" }))
router.use('/todos',todoRouter);

module.exports = router;