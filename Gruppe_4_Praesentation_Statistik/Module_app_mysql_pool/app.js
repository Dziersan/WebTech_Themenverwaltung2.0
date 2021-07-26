/*var express = require('express');*/
var path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({extended: false}));



router.get("/login", function(req, res) {
    res.render("C:/Users/Julia/IdeaProjects/WebTech_Themenverwaltung2.0/Gruppe_4_Praesentation_Statistik/Views/G4-0050.ejs");
});


module.exports = router;