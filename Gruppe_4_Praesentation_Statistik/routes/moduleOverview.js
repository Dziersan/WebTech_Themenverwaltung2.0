let con = require('../Module_app_mysql_pool/mysql');

const express = require('express');
const moduleOverview = express.Router();


/**
 * JS auf ejs laden und aufrufen
 */
moduleOverview.get('/moduleOverview', async function (request, result) {
    let m = await getModuleOverview();
    result.render("moduleOverview.ejs", {
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
async function getModuleOverview() {
    let m = [];
    let result = await loadModuleOverview();
    for (let i = 0; i< result.length;i++) {
        m.push( { module_id:result[i].module_id, description: result[i].description } );
    }
    return m;
}


loadModuleOverview = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT module_id, description FROM module",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

module.exports = moduleOverview;