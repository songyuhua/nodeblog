    upload = require('jquery-file-upload-middleware');

module.exports = function (app) {
    var resizeConf = require('../../config/config').resizeVersion;
    var dirs = require('../../config/config').directors;
// configure upload middleware
    upload.configure({
        uploadDir: __dirname + '/public/uploads',
        uploadUrl: '/uploads',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });

    app.use('/upload', upload.fileHandler());


    upload.configure({
        uploadDir: __dirname + '/public/uploads/',
        uploadUrl: '/uploads'
    });

/// Redirect all to home except post
    app.get('/upload', function( req, res ){
        res.redirect('/');
    });

    app.put('/upload', function( req, res ){
        res.redirect('/');
    });
    app.post('/upload', function( req, res ){
        res.redirect('/');
    });

    app.delete('/upload', function( req, res ){
        res.redirect('/');
    });

    app.use('/upload', function(req, res, next){
        upload.fileHandler({
            uploadDir: function () {
                return __dirname + '/public/uploads/'
            },
            uploadUrl: function () {
                return '/uploads'
            }
        })(req, res, next);
    });

    app.use('/upload/location', upload.fileHandler({
        tmpDir: dirs.temp,
        uploadDir: __dirname + dirs.location,
        uploadUrl: dirs.location_url,
        imageVersions: resizeConf.location
    }));

    app.use('/upload/location/list', function (req, res, next) {
        upload.fileManager({
            uploadDir: function () {
                return __dirname + dirs.location;
            },
            uploadUrl: function () {
                return dirs.location_url;
            }
        }).getFiles(function (files) {
            res.json(files);
        });
    });

    app.post('/upload', function (req, res, next){
        console.log(res);
    });

// bind event
    upload.on('end', function (fileInfo) {
        // insert file info
        console.log("files upload complete");
        console.log(fileInfo);
    });



    upload.on('delete', function (fileName) {
        // remove file info
        console.log("files remove complete");
        console.log(fileName);
    });

    upload.on('error', function (e) {
        console.log(e.message);
    });
};



