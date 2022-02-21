const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { PORT, DB_ADDRESS } = require('./config');

const app = express();
app.use(bodyParser.json());

mongoose.connect(DB_ADDRESS, () => {
  console.log('Подключено к кладезю знаний');
});

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  console.log(`Пришельцы на порту ${PORT}`);
});
