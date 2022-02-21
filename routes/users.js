const router = require('express').Router();

router.get('/me' /* возвращает информацию о пользователе (email и имя) */);

router.patch('/me' /* Обновление пользователя */);

module.exports = router;
