const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/getUsers', adminController.getUsers);

router.post('/createArticle', [
    body('title').not().isEmpty().escape().withMessage('Title required'),
    body('tags').not().isEmpty().escape().withMessage('Tag(s) required'),
    body('content').not().isEmpty().withMessage('Content required'),
    body('creatorId').not().isEmpty().escape().withMessage('Creator ID required'),
    body('creatorName').not().isEmpty().escape().withMessage('Creator name required')
], isAuth, adminController.createArticle);

router.post('/createUserAccount', [
    body('username').not().isEmpty().escape().withMessage('Username required'),
    body('password').not().isEmpty().escape().withMessage('Password required'),
    body('firstName').not().isEmpty().withMessage('First name required'),
    body('lastName').not().isEmpty().escape().withMessage('Last name required')
], isAuth, adminController.createUserAccount);

router.delete('/deleteUserAccount/:userId', adminController.deleteUserAccount);

module.exports = router;