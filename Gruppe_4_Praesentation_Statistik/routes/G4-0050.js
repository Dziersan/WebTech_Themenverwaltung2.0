/**
 * G4-0050 / Lehrkräfte können Agenda für Module erstellen
 */



//Modulimport
var app = require('../Module_app_mysql_pool/app');
var con = require('../Module_app_mysql_pool/mysql');

const express = require('express');
const G4_0050 = express.Router();

//Definition der Arrays
modulid = [];
modul_bezeichnung = [];

/**
 * JS auf ejs laden und aufrufen
 */
app.get("C:\Users\Julia\IdeaProjects\WebTech_Themenverwaltung2.0\Gruppe_4_Praesentation_Statistik\routes\G4-0050.js", function (request, result) {
    result.render("G4-0050.ejs");
});

getConnection();

/**
 * Verbindung zur Datenbank herstellen
 */
function getConnection() {
    con.connect(function (err) {

        if (err) throw err;



        getValuesfromDb0050();

    });
}

// Werte der Datenbank die wichtig für G4-0050 sind
/**
 * SQL-Abfragen für G4-0050
 */
function getValuesfromDb0050() {

    var sql = "SELECT module_id FROM module";
    con.query(sql, function (err, result) {
        if (err) throw err;
        //durchläuft alle Zeilen und gibt diese Werte an result weiter
        for (var i = 0; i < result.length; i++) {

            modulid[i] = result[i].module_id;
        }
    });
    //modul_bezeichnung
    var sql1 = "SELECT description FROM module";
    con.query(sql1, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {

            modul_bezeichnung[i] = result[i].description;
        }
    });
}
module.exports = G4_0050;
