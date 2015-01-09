var Category = require('../models/category');
var _ = require('underscore');

exports.new = function (req, res) {
    res.render('category_new', {
        title: '后台电影分类录入',
        category:{}
    })
};

// admin post movie
exports.save =  function (req, res) {
    var _category = req.body.category;
    var category = new Category(_category);

    category.save(function (err, category) {
        if (err) {
            console.log(err)
        }

        res.redirect('/admin/category/list');
    });
};

exports.list =  function (req, res) {
    Category.fetch(function (err, categories) {
        if (err) {
            console.log(err)
        }
        res.render('category_list', {
            title: '分类列表页',
            categories: categories
        })
    })
};
