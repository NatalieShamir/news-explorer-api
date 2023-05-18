const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const { userRouter } = require('./routes/users');
const { articleRouter } = require('./routes/articles');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middlewares/error-handler');

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', articleRouter);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
