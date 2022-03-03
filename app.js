require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const signoutRouter = require('./routes/signout');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const errorHandler = require('./middleware/error-handler');
const NotFoundError = require('./errors/not-found-error');
const { NODE_ENV, DB_ADDRESS, PORT} = process.env;
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://127.0.0.1:27017/mvexapidb')
  .then(() => {
    console.log(`Подключено к кладезю знаний`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);

app.use(auth);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use((res, req, next) => {
  next(new NotFoundError('Страницы пока нет'));
});

app.use(errorLogger);
app.use(errorHandler);
app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
  console.log(`Пришельцы на порту ${NODE_ENV === 'production' ? PORT : 3000}`);
});
