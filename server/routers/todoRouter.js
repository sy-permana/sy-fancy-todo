const router = require('express').Router();
const Controller = require('../controllers/TodoController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);
router.get('/', Controller.readAll);
router.post('/', Controller.create);
router.get('/:id', Controller.readOne);
router.put('/:id', authorization, Controller.update);
router.patch('/:id', authorization, Controller.toggleStatus)
router.delete('/:id', authorization, Controller.destroy);

module.exports = router;