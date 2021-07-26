/**
 * G4-0100 / Eine Übersicht für die Lehrkräfte in welchen Modulen ein Präsentationstermin bevorsteht
 */


//Modulimport
let con = require('../Module_app_mysql_pool/mysql');
const express = require('express');
const G4_0100 = express.Router();

//Definition der Arrays

/**
 * JS auf ejs laden und aufrufen
 */

G4_0100.get('/G4-0100', async function  (request, result) {


    let data = await getPresentation();
    result.render("G4-0100.ejs", {
        presentations: data
    });
});




async function getPresentation() {

    let data = [];
    let result = await LoadData()
    for (let i = 0; i < result.length; i++) {
        data.push({
            room:result[i].room,
            date:result[i].date,
            occasion:result[i].occasion  });
    }
    return data;
}

LoadData = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT room, date, occasion FROM presentation",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

module.exports = G4_0100;