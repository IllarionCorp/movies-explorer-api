const router = require('express').Router();
const { loginUser } = require('../controllers/users');
const { validationLogin } = require('../middleware/validation');

router.post('/', validationLogin, loginUser);

module.exports = router;
