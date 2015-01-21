var _ = require('underscore');
var Article = require('../app/controllers/article');
var User = require('../app/controllers/user');
/* var Movie = require('../app/controllers/movie');
 var Comment = require('../app/controllers/comment');
 var Category = require('../app/controllers/category');*/

module.exports = function (app) {

    /*app.get('/', function (req, res) {
     */
    /*res.set('Content-Type', 'text/html; charset=utf-8');
     res.render('index', {
     title: '影院热度播报'
     })*/
    /*
     res.send('pig')
     });*/
    app.get('/',Article.index);
    app.get('/article/:id', Article.detail);
    app.get('/admin/article/new',User.signinRequired,User.adminRequired,Article.new);
    app.get('/admin/article/update/:id', User.signinRequired,User.adminRequired,Article.update);
    app.post('/admin/article', User.signinRequired,User.adminRequired,Article.save);
    app.get('/admin/article/list', User.signinRequired,User.adminRequired, Article.list);
    app.delete('/admin/article/list',User.signinRequired,User.adminRequired, Article.del);

    app.get('/upload', function (req, res) {
        res.render('upload');
    });

    app.get('/aboutme',Article.aboutme);

    //User
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);
    app.get('/signin', User.showSignIn);
    app.get('/signup', User.showSignUp);
    app.get('/logout',User.logout);
    app.get('/admin/user/list', User.signinRequired,User.adminRequired, User.list);

};


