var con = require('../Module_app_mysql_pool/mysql');
const express = require('express');
const presentationDateOverview = express.Router();
/**
 * JS auf ejs laden und aufrufen
 */

presentationDateOverview.get('/presentationDateOverview', async function (request, result) {
    let m = await getPresentationDateOverview();
    result.render("presentationDateOverview.ejs", {
        module:m
    });
});

/**
 * Verbindung zur Datenbank herstellen
 */
async function  getPresentationDateOverview(){
    let m = [];
    let result = await loadPresentationDateOverview();
    for (let i = 0; i< result.length;i++) {
        m.push( { module_id:result[i].module_id, description: result[i].description } );
    }
    return m;
}


/**
 * SQL-Abfragen für die jeweiligen Spalten
 */
loadPresentationDateOverview = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT module_id, description FROM module",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

module.exports = presentationDateOverview;





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

presentationDateOverview.get('/G4-0900', function (request, response) {
    console.log("G4-0900 wurde geladen");
    response.render("inquiryDozent.ejs", {
        benutzername: "Test",
        Gruppennummer: "2",
    });
});




module.exports = presentationDateOverview;*/
