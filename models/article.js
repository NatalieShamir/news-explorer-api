const mongoose = require('mongoose');

const { urlRegExp } = require('./constants/index');


const userSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'keyword field is a required field'],
  },
  title: {
    type: String,
    required: [true, 'title field is a required field'],
  },
  text: {
    type: String,
    required: [true, 'text field is a required field'],
  },
  date: {
    type: String,
    required: [true, 'date field is a required field'],
  },
  source: {
    type: String,
    required: [true, 'source field is a required field'],
  },
  link: {
    type: String,
    required: [true, 'link field is a required field'],
    validate: {
      validator: (v) => urlRegExp.test(v),
      message: 'Please fill-in this field',
    },
  },
  image: {
    type: String,
    required: [true, 'image field is a required field'],
    validate: {
      validator: (v) => urlRegExp.test(v),
      message: 'Please fill-in this field',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  }
});

module.exports = mongoose.model('article', userSchema);