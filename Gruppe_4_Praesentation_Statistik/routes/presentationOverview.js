/**
 * G4-0800 / Übersicht über Präsentationen in einem Modul für die Studierenden
 */

var con = require('../Module_app_mysql_pool/mysql');

const express = require('express');
const presentationOverview = express.Router();

/*//Definition der Arrays
anlass = [];
datum = [];
raum = [];
pid = [];*/

/**
 * JS auf ejs laden auf aufrufen
 */
/*presentationOverview.get('/G4-0800',function (request,result) {
    result.render('presentationOverview.ejs',
        {
            benutzername : "Test",
            Modulname : "WEB-TECH",

        });
});*/

presentationOverview.get('/presentationOverview', async function (request, result) {
    let m = await getPresentationOverview();
    result.render("presentationOverview.ejs", {
        module: m
    });
});


/**
 * JS auf ejs laden und an /reihenfolge schicken
 */

presentationOverview.post('/Reihenfolge', function (request,result) {
    var sqlStatement= "SELECT "
    result.render("presentationOverview.ejs", {
        benutzername : "Test",
        Modulname : "WEB-TECHNEU",
        date :date,
        thema: thema,
        raum:raum,
    });
});


/**
 * SQL-Abfragen für die jeweiligen Spalten
 */

async function getPresentationOverview() {
    let m = [];
    let result = await loadPresentationOverview();
    for (let i = 0; i< result.length;i++) {
        m.push( { occasion:result[i].occasion,date:result[i].date, room:result[i].room, topic_id: result[i].topic_id} );
    }
    return m;
}

loadPresentationOverview = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT occasion,date,room,topic_id FROM presentation",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

module.exports = presentationOverview;


/*
function getValuesFromDb() {
    //Anlass
    var sql = "SELECT occasion,date,room,topic_id FROM presentation /!*,modul WHERE modul(von Tabelle praesentation) = mid(die mitgegeben wurde)*!/ ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            anlass[i] = result[i].anlass;
        }
    });

}
*/

/*
module.exports = presentationOverview;*/
