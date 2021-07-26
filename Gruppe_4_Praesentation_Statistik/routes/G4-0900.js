/**
 * G4-0900 / Anfrage Dozenten für Hilfe und/oder Terminänderung
 */

//Modulimport
let con = require('../Module_app_mysql_pool/mysql');
const express = require('express');
const G4_0900 = express.Router();


G4_0900.get('/G4-0100', async function (request, response) {
    let data = await getPresentation();
    response.render("G4-0900.ejs", {
        benutzername: "Test",
        Gruppennummer: "2",
    });
});


/**
 * Werte aus dem Formular in die Relation Nachrichten einfügen
 */
// CALL OF the form sendMessage

G4_0900.post('/sendMessage', function (request, result) {
    var sql = "INSERT INTO messages(message,date,type) VALUES("+
        request.body.message + "','" + request.body.date + "','"
        + request.body.dateRequestQuestion + "');";
    con.query(sql, function (err) {
        if (err) throw err;
    });
    //JS auf ejs laden und aufrufen
    result.render("G4-0900.ejs", {
        benutzername: "Test",
        Gruppennummer: "2",
    });
});


/**
 * Listening auf Server
 */