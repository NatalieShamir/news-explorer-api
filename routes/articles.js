const express = require('express');

const router = express.Router();

const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

const { validateArticleBody, validateArticleId } = require('../middlewares/validation');

router.get('/', getAllArticles);
router.post('/', validateArticleBody, createArticle);
router.delete('/articleId', validateArticleId, deleteArticle);

module.exports = {
  articleRouter: router,
};
