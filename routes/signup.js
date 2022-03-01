const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validationSignUp } = require('../middleware/validation');

router.post('/', validationSignUp, createUser);

module.exports = router;
