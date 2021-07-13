var express = require('express');
var app = express();
var router = express.Router();
var upload = require('./app/config/multerConfig.js');

global.__basedir = __dirname;

app.use(express.static('resources'));

require('./app/routers/file.router.js')(app, router, upload);

// Create a Server
var server = app.listen(3306, () => {

    var host = server.address().address;
    var port = server.address().port;
})