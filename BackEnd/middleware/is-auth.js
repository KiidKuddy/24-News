const jwt = require('jsonwebtoken');

const AuthenticationError = require('../models/errors/AuthenticationError');

const SECRET = 'yuxsl6oRzuP1vyCe1BAh5*%T0kOT#HUR$G6PiwI70XrGu3zf%azUZFFn5y&H539cwT#Lipgb027yd2qDzSPQAx9G%a#HY$9K&5p';

module.exports = (req, res, next) => {
    const authError = new AuthenticationError(
        'Not authenticaded',
        req.originalUrl,
        'Please provide a valid authentication token to access resource.'
    );
    try {
        const authHeader = req.get('Authorization');
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET);
        next();
    } catch (error) {
        next(authError);
    }
}