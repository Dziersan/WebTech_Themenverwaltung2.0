var express = require('express');
var app = express()

app.set('view engine', 'ejs');


app.get("/login", function(req, res) {
    res.render("C:/Users/Julia/IdeaProjects/WebTech_Themenverwaltung2.0/Gruppe_4_Praesentation_Statistik/Views/G4-0200.ejs");
});


app.listen(8080, function () {
    console.log('Server running at http://127.0.0.1:8080/login');

});

