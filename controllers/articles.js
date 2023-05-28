const Article = require('../models/article');

const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const AccessDeniedError = require('../errors/AccessDeniedError');

const getSavedArticles = (req, res, next) => {
  articleModel
    .find({ owner: req.user._id })
    .then((articles) => {
      res.send(articles);
    })
    .catch(() => next(new InternalServerError('An error has occured on the server')));
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;

        next(new BadRequestError({ message }));
      } else {
        next(new InternalServerError('An error has occured on the server'));
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .orFail(() => new NotFoundError('No article found with that ID'))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        return next(new AccessDeniedError('You cannot delete someone elses saved article'));
      }
      return article.deleteOne()
        .then(() => res.send({ message: 'Article deleted successfully' }));
    })
    .catch(next);
};

module.exports = {
  getSavedArticles, createArticle, deleteArticle,
};
