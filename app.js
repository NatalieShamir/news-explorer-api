const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
