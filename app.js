require('dotenv').config();

const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const rateLimit = require('express-rate-limit');

const mongoose = require('mongoose');

const cors = require('cors');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const { userRouter } = require('./routes/users');
const { articleRouter } = require('./routes/articles');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateUserBody, validateAuthentication } = require('./middlewares/validation');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/NotFoundError');

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsdb');

app.post('/signin', validateAuthentication, login);
app.post('/signup', validateUserBody, createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Not found route'));
});
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);//eslint-disable-line
});
