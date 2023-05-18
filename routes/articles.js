const express = require('express');

const router = express.Router();

const { getAllArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getAllArticles);
router.post('/', createArticle);
router.delete('/articleId', deleteArticle);

module.exports = {
  articleRouter: router,
};
