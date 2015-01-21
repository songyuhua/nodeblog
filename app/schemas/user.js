var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
//var SALT_WORK_FACTOR = 10
var UserSchema = new mongoose.Schema({
    name: {unique: true, type: String},
    password: String,
    role:{
        type:Number,
        default:0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})


UserSchema.pre('save', function (next) {
    var user = this
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    /*var md5 = crypto.createHash('md5');

    //var pwd = user.password;
    user.password = md5.update(user.password).digest('base64');*/

    user.password = decrypt(user.password);

    next();

    /*bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
     if (err) return next(err)

     bcrypt.hash(user.password, salt, function(err, hash) {
     if (err) return next(err)

     user.password = hash
     next()
     })
     })*/

    /*bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err){
            return next(err);
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        })
    })*/
});


function decrypt(str) {
    var md5 = crypto.createHash('md5');

    var password = md5.update(str).digest('base64');
    return password;
}

UserSchema.methods = {
    comparePassword:function(_password,callback){
        var _password = decrypt(_password);
        if(this.password === _password){
            callback(null,true);
        }
        else{
            return callback('密码错误');
        }
    }
};


UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
}

module.exports = UserSchema
