/**
 * 注册前端模版
 * User: ysj
 * Date: 12-10-26
 * Time: 下午4:50
 */
var hbs = require('hbs'),
    fs = require('fs');

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }
    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

var moment = require('moment');
hbs.registerHelper('datetimeFormat', function(context, options) {
    if (!context) {
        return '';
    }
    var format = options.hash.format ? options.hash.format : 'YYYY-MM-DD HH:mm:ss';
    return moment(context).format(format);
});

/*hbs.registerPartial('side', fs.readFileSync(__dirname + '/../public/views/index-side.tpl').toString());
hbs.registerPartial('over_view', fs.readFileSync(__dirname + '/../public/views/index-overView.tpl').toString());
//預報誤差
hbs.registerPartial('forecast_error', fs.readFileSync(__dirname + '/../public/views/index_forecastError.tpl').toString());
hbs.registerPartial('range7', fs.readFileSync(__dirname + '/../public/views/index_windRange7.tpl').toString());
hbs.registerPartial('range10', fs.readFileSync(__dirname + '/../public/views/index_windRange10.tpl').toString());
//預報將臨近的城市
hbs.registerPartial('forecast_range', fs.readFileSync(__dirname + '/../public/views/index_forecastWindRange.tpl').toString());
hbs.registerPartial('guess', fs.readFileSync(__dirname + '/../public/views/index_guess.tpl').toString());
hbs.registerPartial('wind_chart', fs.readFileSync(__dirname + '/../public/views/index_windChart.tpl').toString());*/
//hbs.registerPartial('typeModuleList', fs.readFileSync(__dirname + '/../public/views/typeModuleList.html').toString());