const express = require('express');
const mongoose = require('mongoose');
const {PORT, DB_ADDRESS} = require('./config');

const app = express();
mongoose.connect(DB_ADDRESS, () => {
    console.log('Подключено к кладезю знаний');
});


app.listen(PORT, () => {
    console.log(`Пришельцы на порту ${PORT}`);
});