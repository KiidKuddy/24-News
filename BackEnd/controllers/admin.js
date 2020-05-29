const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const UserSchema = require('../schemas/user');
const ArticleSchema = require('../schemas/article');

const ValidationError = require('../models/errors/ValidationError');
const NotFoundError = require('../models/errors/NotFoundError');

exports.getUsers = async (req, res, next) => {
    const totalUsers = await UserSchema.countDocuments();
    const currentPage = req.query.page || 1;
    const usersPerPage = Number(req.query.perPage) || totalUsers;
    const users = await UserSchema
        .find()
        .skip((currentPage - 1) * usersPerPage)
        .limit(usersPerPage)
        .select('-admin');

    res.status(200).json({
        users: users,
        totalUsers: totalUsers
    });
}

exports.createArticle = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ValidationError(req.originalUrl, errors.array()));
    }
    if (!req.file) {
        return next(new ValidationError(req.originalUrl, {
            msg: "Image required",
            param: "image",
            location: "body"
        }));
    }

    try {
        const validationError = new ValidationError(
            req.originalUrl,
            'The ID provided for the creatorId field is not valid.'
        );
        if (!mongoose.isValidObjectId(req.body.creatorId)) {
            return next(validationError);
        }
        await UserSchema.findById(req.body.creatorId);
    } catch (error) {
        return next(validationError);
    }

    let tags = req.body.tags.split(' ');
    for (let i = 0; i < tags.length; i++) {
        tags[i] = tags[i][0].toUpperCase() + tags[i].slice(1);
    }
    const newArticle = new ArticleSchema({
        title: req.body.title,
        content: req.body.content,
        tags: tags,
        date: new Date(),
        creatorId: req.body.creatorId,
        creatorName: req.body.creatorName,
        image: req.file.filename
    });

    await newArticle.save();
    res.status(201).json({
        message: 'Article created.'
    });
}

exports.createUserAccount = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ValidationError(req.originalUrl, errors.array()));
    }
    if (!req.file) {
        return next(new ValidationError(req.originalUrl, {
            msg: "Image required",
            param: "image",
            location: "body"
        }));
    }

    const newUser = new UserSchema({
        username: req.body.username.toLowerCase(),
        password: bcrypt.hashSync(req.body.password, 12),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profilePicture: req.file.filename
    });

    const usernameExists = await UserSchema.findOne({ username: newUser.username });
    if (usernameExists) {
        return next(new ValidationError(req.originalUrl, 'Username already exists.'));
    }

    await newUser.save();
    res.status(201).json({
        message: 'User registered.'
    });
}

exports.deleteUserAccount = async (req, res, next) => {
    const error = new NotFoundError(req.originalUrl, 'Please provide a valid user ID');
    const userId = req.params.userId;
    if (!userId) {
        return next(error);
    }

    const userDeleted = await UserSchema.remove({ _id: userId });
    if (!userDeleted) {
        return next(error);
    }

    res.status(200).json({
        message: 'User account deleted successfully'
    });
}