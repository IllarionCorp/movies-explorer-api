require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorHandler = require('./middleware/error-handler');

const { NODE_ENV, DB_ADDRESS, PORT } = process.env;
const { requestLogger, errorLogger } = require('./middleware/logger');

const app = express();
app.use(bodyParser.json());

mongoose
  .connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://127.0.0.1:27017/mvexapidb')
  .then(() => {
    console.log('Подключено к кладезю знаний');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(NODE_ENV === 'production' ? PORT : 3000, () => {
  console.log(`Пришельцы на порту ${NODE_ENV === 'production' ? PORT : 3000}`);
});
