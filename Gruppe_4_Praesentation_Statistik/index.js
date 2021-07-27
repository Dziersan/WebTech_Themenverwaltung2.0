var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var LoadRoutes = require('./routes/MainRouteDefinition')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({extended: false}));

// load routes
let con = require('./Module_app_mysql_pool/mysql');
con.connect();

LoadRoutes(app);

app.listen(8080, function () {
    console.log('Server running at http://127.0.0.1:8080/');
});
