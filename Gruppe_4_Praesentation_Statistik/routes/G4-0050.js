/**
 * G4-0050 / Lehrkräfte können Agenda für Module erstellen
 */

//Modulimport
var con = require('../Module_app_mysql_pool/mysql');

const express = require('express');
const G4_0050 = express.Router();


/**
 * JS auf ejs laden und aufrufen
 */
G4_0050.get('/G4-0050', async function (request, result) {
    let m = await getModuleG40500();
    result.render("G4-0050.ejs", {
        module: m
    });
});


/**
 * Verbindung zur Datenbank herstellen
 */
// Werte der Datenbank die wichtig für G4-0050 sind


/**
 * SQL-Abfragen für G4-0050
 */
async function getModuleG40500() {
    let m = [];
    let result = await LoadDataG40500();
    for (let i = 0; i< result.length;i++) {
        m.push( { module_id:result[i].module_id, description: result[i].description } );
    }
    return m;
}


LoadDataG40500 = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT module_id, description FROM module",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

module.exports = G4_0050;