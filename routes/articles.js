const express = require('express');

const router = express.Router();
/*
const {
} = require('./controllers/articles');

const { } = require('./middleware/validation');
 */
router.get('/articles', getAllArticles);
router.post('/articles', createArticle);
router.delete('/articles/articleId', deleteArticle);;

module.exports = {
  articleRouter: router,
};
