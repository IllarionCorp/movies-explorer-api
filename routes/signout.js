const router = require('express').Router();
const { logoutUser } = require('../controllers/users');

router.post('/', logoutUser);

module.exports = router;
