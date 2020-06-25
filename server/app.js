import path from "path";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import errorHandler from "errorhandler";
import mongoose from "mongoose";

mongoose.promise = global.Promise;

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
// Add routes
