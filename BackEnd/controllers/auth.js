const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const UserSchema = require('../schemas/user');

const ValidationError = require('../models/errors/ValidationError');
const AuthenticationError = require('../models/errors/AuthenticationError');

const SECRET = 'yuxsl6oRzuP1vyCe1BAh5*%T0kOT#HUR$G6PiwI70XrGu3zf%azUZFFn5y&H539cwT#Lipgb027yd2qDzSPQAx9G%a#HY$9K&5p';

exports.login = async (req, res, next) => {
    const authError = new AuthenticationError(
        'Incorrect username or password',
        req.originalUrl,
        'Authentication failed due to incorrect username or password.'
    );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ValidationError(req.originalUrl, errors.array()));
    }

    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const user = await UserSchema.findOne({
        username: username
    });
    if (!user) {
        return next(authError);
    }
    
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
        const token = jwt.sign({
                userId: user._id.toString(),
                name: user.username
            },
            SECRET, {
                expiresIn: '1h'
            }
        );
        res.status(200).json({
            token: token
        });
    } else {
        next(authError);
    }
}