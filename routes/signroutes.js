const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validationSignUp } = require('../middleware/validation');
const { logoutUser } = require('../controllers/users');
const { loginUser } = require('../controllers/users');
const { validationLogin } = require('../middleware/validation');

router.post('/signin', validationLogin, loginUser);

router.post('/signout', logoutUser);

router.post('/signup', validationSignUp, createUser);

module.exports = router;
