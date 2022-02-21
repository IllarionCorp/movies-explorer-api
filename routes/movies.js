const router = require('express').Router();

router.get('/' /* Сохраненные фильмы юзера */);

router.post('/' /* создает фильм */);

router.delete('/_id' /* удаляет фильм */);

module.exports = router;
