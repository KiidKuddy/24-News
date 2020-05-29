const path = require('path');

const ArticleSchema = require('../schemas/article');

const NotFoundError = require('../models/errors/NotFoundError');

exports.getArticles = async (req, res, next) => {
    const articles = await ArticleSchema.find();
    res.status(200).send(articles);
}

exports.getArticle = async (req, res, next) => {
    const articleId = req.params.articleId;
    try {
        const article = await ArticleSchema.findById(articleId);
        res.status(200).send(article);
    } catch (error) {
        next(new NotFoundError(
            req.originalUrl,
            `No article with ID [${articleId}] found.`
        ));
    }
}

exports.getArticleImage = async (req, res, next) => {
    const articleId = req.params.articleId;
    try {
        const article = await ArticleSchema.findById(articleId);
        res.sendFile(path.resolve(__dirname, `../images/${article.image}`));
    } catch (error) {
        next(new NotFoundError(
            req.originalUrl,
            `No image found for article with ID [${articleId}].`
        ));
    }
}