const express = require('express');

const isAuth = require('../middleware/is-auth');
const articlesController = require('../controllers/articles');

const router = express.Router();

router.get('/getArticles', isAuth, articlesController.getArticles);
router.get('/getArticle/:articleId', isAuth, articlesController.getArticle);
router.get('/getArticleImage/:articleId', isAuth, articlesController.getArticleImage);

module.exports = router;