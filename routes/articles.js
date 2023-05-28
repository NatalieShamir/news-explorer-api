const express = require('express');

const router = express.Router();

const { getSavedArticles, createArticle, deleteArticle } = require('../controllers/articles');

const { validateArticleBody, validateArticleId } = require('../middlewares/validation');

router.get('/', getSavedArticles);
router.post('/', validateArticleBody, createArticle);
router.delete('/articleId', validateArticleId, deleteArticle);

module.exports = {
  articleRouter: router,
};
