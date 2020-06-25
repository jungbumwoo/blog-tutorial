import path from "path";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import errorHandler from "errorhandler";
import mongoose from "mongoose";


mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost/lightblog');
mongoose.set('debug', true);


const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'LightBlog', cookie: { maxAge: 60000}, resave: false, saveUninitialized: false }));

if(!isProduction) {
    app.use(errorHandler());
}

mongoose.connect('mongodb://localhose/lightblog');
mongoose.set('debug', true);

// Add models
require('./models/Articles');
// Add routes

app.use(require('./routes'));

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err,
            },
        })
    })
}

app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
        errors: {
            message: err.message,
            error: {},
        },
    })
})

const server = app.listen(8000, ()=> console.log('Server started on http://localhost:8000'));