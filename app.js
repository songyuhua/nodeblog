var express = require('express');
//
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connect = require('connect');
var logger = require('morgan');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');

/*require('app/controllers/upload');*/

//
require("./config/registerTemplate");
//
var port = process.env.PORT || 3000;
var path = require('path');
//
var app = express();
app.locals.moment = require('moment')
var dbUrl = 'mongodb://localhost/blog';

mongoose.connect(dbUrl);

app.set('views', './public/views/pages');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
/*app.use(express.favicon(path.join(__dirname, 'upload/images/张子凡1.png')));*///express4不再支持

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(session({
    secret:'blog',
    store: new mongoStore({
        url:dbUrl,
        collection:'sessions'
    })
}));

if('development' === app.get('env')){
    app.set('showStackError',true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app);
require('./app/controllers/upload')(app);
app.listen(port);
console.log('program start on port' + port);