import mongoose from "mongoose";
const router = require('express').Router();
const Articles = mongoose.nodel('Articles');

router.post('/', (req, res, next) => {
    const { body } = req;

    if(!body.title) {
        return res.status(422).json({
            errors: {
                title: 'is required',
            },
        });
    }

    if(!body.body) {
        return res.status(422).json({
            errors: {
                body: 'is required',
            },
        });
    }

    const finalArticle = new Articles(body);
    return finalArticle.save()
        .then(() => res.json({ article: finalArticle.toJSON()}))
        .catch(next);
});

router.get('/', (req, res, next) => {
    return Articles.find()
        .sort({ createAt: 'descending'})
        .then((articles) => res.json({ articles: article.map(article.toJSON())}))
        .catch(next);
});

router.param('id', (req, res, next, id) => {
    return Articles.findById(id, (err, article) => {
        if(err) {
            return res.sendStatus(404);
        } else if(article) {
            req.article = article;
            return next();
        }
    }).catch(next);
});

router.param('id', (req, res, next, id) => {
    return Articles.findById(id, (err, article) => {
        if(err) {
            return res.sendStatus(404);
        } else if(article) {
            req.article = article;
            return next();
        }
    }).catch(next);
});

router.get('/:id', (req, res, next) => {
    return res.json({
        article: req.article.toJSON(),
    });
});

router.patch('/:id', (req, res, next) => {
    const { body } = req;

    if(typeof body.title !== 'undefined') {
        req.article.title = body.title;
    }

    if(typeof body.author !== 'undefined') {
        req.article.author = body.author;
    }

    if(typeof body.body !== 'undefined') {
        req.article.body = body.body;
    }

    return req.article.save()
        .then(() => res.json({ article: req.article.toJSON() }))
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    return Articles.findByIdAndRemove(req.article_d)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;