/**
 * G4-0700 / Übersicht der Module mit Präsentationen für die Studierenden
 */

var con = require('../Module_app_mysql_pool/mysql');

const express = require('express');
const G4_0700 = express.Router();

//Definition der Arrays
modul_id = [];
modul_bezeichnung = [];


/**
 * JS auf ejs laden und aufrufen
 */

G4_0700.get('/G4-0700', async function (request, result) {
    let m = await getModuleG40700();
    result.render("G4-0700.ejs", {
        module:m
    });
});

/**
 * Verbindung zur Datenbank herstellen
 */
async function  getModuleG40700(){
    let m = [];
    let result = await LoadDataG40700();
    for (let i = 0; i< result.length;i++) {
        m.push( { module_id:result[i].module_id, description: result[i].description } );
    }
    return m;
}


/**
 * SQL-Abfragen für die jeweiligen Spalten
 */
LoadDataG40700 = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT module_id, description FROM module",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

module.exports = G4_0700;





/*
async function getValuesFromDb() {
    //alle Attribute aus Relation modul abfragen
    var sql = "SELECT * FROM module /!* da muss noch ne Abfrage für den speziellen USER hinzugefügt werden *!/";
    con.query(sql, function (err, result) {

        if(err) throw err;
        //alle Attribute durchlaufen und in result laden
        for (var i = 0; i < result.length; i++) {
            modul_id[i] = result[i].modul_id;
            modul_bezeichnung[i] = result[i].beschreibung;
        }
    });
}

/!**
 * G4-0900 aufrufen
 *!/

G4_0700.get('/G4-0900', function (request, response) {
    console.log("G4-0900 wurde geladen");
    response.render("G4-0900.ejs", {
        benutzername: "Test",
        Gruppennummer: "2",
    });
});




module.exports = G4_0700;*/
