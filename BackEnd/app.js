const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const authRoues = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const articlesRoutes = require('./routes/articles');

const PORT = 3000;
const MONGODB_URI = 'mongodb+srv://edimenboss:TZizoUIRLqz0ZNBc@cluster0-kvomi.mongodb.net/news24';

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + ' - ' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));

app.disable('x-powered-by');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', authRoues);
app.use('/api/admin', adminRoutes);
app.use('/api/articles', articlesRoutes);
app.use((err, req, res, next) => {
    console.log(req.file);
    if (req.file) {
        fs.unlinkSync(req.file.path);
    }
    res.status(err.status).json({
        error: err
    });
});

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        app.listen(PORT, () => console.log('\nServer listening on port ' + PORT + '\n'));
    })
    .catch(error => console.error(error));