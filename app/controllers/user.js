var User = require('../models/user');


exports.showSignUp = function(req,res){
    res.render('signup',{
    });
};
exports.signup = function (req, res) {
    var _user = req.body.user;
    console.log(_user);

    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            console.log(err);

        }
        if (user) {
            res.send(400);
            //return res.redirect('/signin');
        } else {
            var user = new User(_user);
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                }
                //res.redirect('/');
                res.send(200);
            });
        }
    });
};

//

exports.showSignIn = function(req,res){
    res.render('signin',{
    });
};
exports.signin = function (req, res) {
    var _user = req.body.user;
    console.log(_user);

    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            console.log(err);

        }
        if (!user) {
            //res.send(400,'不存在该用户');
            return res.send(400, '不存在该用户!!');
            //return res.redirect('/signup');
        }

        user.comparePassword(_user.password, function (err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                console.log('密码正确');
                req.session.user = user;
                return res.send(200, '登陆成功!!');
                //return res.redirect('/');
            }
            else {
                console.log('password is not match');
                return res.send(400,'密码错误');
                //return res.redirect('/signin');

            }
        })

    });

};
//logout 登出
exports.logout = function (req, res) {
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
};

exports.list =  function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err)
        }
        res.render('userlist', {
            title: '用户列表页',
            users: users
        })
    })
};

//用户中间件
//登陆验证
// midware for user
exports.signinRequired = function(req, res, next) {
    var user = req.session.user

    if (!user) {
        return res.redirect('/signin')
    }

    next()
}

exports.adminRequired = function(req, res, next) {
    var user = req.session.user

    if (user.role < 10) {
        return res.redirect('/signin')
    }

    next()
}
