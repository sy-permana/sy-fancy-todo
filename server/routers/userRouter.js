const router = require('express').Router();
const Controller = require('../controllers/UserController');

router.post('/signup', Controller.signUp);
router.post('/signin', Controller.signIn);

module.exports = router;
