const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', [
    body('username').not().isEmpty().withMessage('Username required'),
    body('password').not().isEmpty().withMessage('Password required'),
], authController.login);

module.exports = router;