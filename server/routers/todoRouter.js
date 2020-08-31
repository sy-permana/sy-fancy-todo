const router = require('express').Router();
const Controller = require('../controllers/TodoController');

router.get('/', Controller.readAll);
router.post('/', Controller.create);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.destroy);

module.exports= router;