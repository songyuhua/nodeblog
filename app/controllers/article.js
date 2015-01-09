var ArticleModel = require('../models/article');
exports.index = function (req, res) {
    ArticleModel.fetch(function (err, articles) {
        if (err) {
            console.log(err)
        }
        console.log('articles:');
        console.log(articles);
        res.render('index', {
            title: '首页',
            articles: articles
        });
    })

};

exports.detail = function (req, res) {
    var id = req.params.id;
    ArticleModel.findById(id, function (err, article) {
        res.render('detail', {
            article: article
        })
    })
};

exports.new = function (req, res) {
    res.render('admin', {
        title: '博文 后台录入页',
        article: {}
    })
};

exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        ArticleModel.findById(id, function (err, article) {

            res.render('admin', {
                title: '博文 后台更新页面',
                article: article
            })
        })
    }
};

// admin post movie
exports.save = function (req, res) {
    var id = req.body.article._id
    var articleObj = req.body.article

    var _article;

    if (id) {
        ArticleModel.findById(id, function (err, article) {
            if (err) {
                console.log(err)
            }

            _article = _.extend(article, articleObj)
            _article.save(function (err, article) {
                if (err) {
                    console.log(err)
                }
                res.redirect('/article/' + _article.id)
            })

        })
    } else {
        _article = new ArticleModel(articleObj);

        _article.save(function (err, article) {
                if (err) {
                    console.log(err)
                }
                article.save(function (err, article) {
                    res.redirect('/article/' + article._id)
                })
            }
        );

    }
};

exports.list = function (req, res) {
    ArticleModel.fetch(function (err, articles) {
        if (err) {
            console.log(err)
        }
        res.render('/', {
            title: '文章 列表页',
            articles: articles
        })
    })
};

exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        ArticleModel.remove({_id: id}, function (err, article) {
            if (err) {
                console.log(err);
                return res.send(400, '删除失败!!');
            }
            else {
                return res.send(200, '删除成功!!');
            }
        });
    }
};