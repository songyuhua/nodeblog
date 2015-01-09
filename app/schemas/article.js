var mongoose = require('mongoose');
//var markdown = require('markdown').markdown;

var ArticleSchema = new mongoose.Schema({
    author:String,
    title:String,
    tags:String,
    category:String,
    content:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    },
    visitedNum:Number
});

ArticleSchema.pre('save',function(next){
    //this.content = markdown.toHTML(this.content);
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();
});

ArticleSchema.statics = {
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }
};

module.exports = ArticleSchema;