
/**
 * Importieren der App und MySql-Module
 */
var app = require('../app');
var con = require('../mysql');

const express = require('express');
const G4_0200fs = express.Router();


/**
 * Arrays für die Speicherung der SQL-Abfragen
 */

reihenfolge =[];
gruppe=[];
thema=[];
mitglieder=[];
startzeit=[];
dauer=[];
ende=[];
raum=[];
tag=[];
anlass=[];
modul=[];

/**
 * Aufruf der Seite G4-0200 für Studenten
 */
G4_0200fs.get('/G4-0200fS', function (request, result) {

    result.render("G4-0200forStudents.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
        benutzername: "Rokko",

        //Modulinformationen

        modulname: modul,
        modulthema: anlass,
        datum: tag,
        raum1: raum,

    });

});



/**
 * Verbindungsaufbau zur DB
 */
getValuesfromDb();

/**
 * SQL-Abfragen aus DB
 */

function getValuesfromDb() {

    var sql = "SELECT * FROM agenda /* WHERE PID IS = */";

    con.query(sql, function (err,result) {
        if (err) throw err;


        for (var i = 0; i < result.length; i++) {
            reihenfolge[i] = result[i].group_order;
            gruppe[i] = result[i].group_number;
            thema[i] = result[i].topic;
            mitglieder[i] = result[i].number_members;
            startzeit[i] = result[i].start_presentation;
            dauer[i] = result[i].duration_presentation;
            ende[i] = result[i].end_presentation;

        }
    });
    var sql1 = "SELECT room, occasion, date, module FROM presentation /* WHERE pid = */ ";

    con.query(sql1, function (err,result) {
        if (err) throw err;


        for (var i = 0; i < result.length; i++) {

            raum[i] = result[i].room;
            tag[i] = result[i].date;
            anlass = result[i].occasion;
            modul = result[i].module;
        }
    });
}


module.exports = G4_0200fs;