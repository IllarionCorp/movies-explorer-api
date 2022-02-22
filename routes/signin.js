const router = require('express').Router();
const { loginUser } = require('../controllers/users');

router.post('/', loginUser);

module.exports = router;
