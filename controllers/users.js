const User = require('../models/users');

function getUser(req, res, next) {
    const id = req.user._id;
    return User
        .findById(id)
        .then((user) => {
            res.status(200).send(user);
        })
}