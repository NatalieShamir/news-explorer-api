const express = require('express');

const router = express.Router();
/*
const {
  getCurrentUser,
} = require('./controllers/users');

const { } = require('./middleware/validation'); */

router.get('users/me', getCurrentUser);

module.exports = {
  userRouter: router,
};
