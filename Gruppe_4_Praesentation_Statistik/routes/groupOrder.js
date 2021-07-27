let con = require('../Module_app_mysql_pool/mysql');
const express = require('express');
const groupOrder = express.Router();


/**
 * Arrays für die Speicherung der SQL-Abfragen
 */


/**
 * Aufruf der Seite G4-0200 für Studenten
 */
groupOrder.get('/groupOrder', async function (request, result) {
    let m = await getgroupOrder();
    result.render("groupOrder.ejs", {
        module: m
    });
});

async function getgroupOrder() {
    let m = [];
    let result = await Loadresult();
    let resultpr = await LoadDresults();
    for (let i = 0; i< result.length;i++) {
        m.push({
            group_order: result[i].group_order,
            group_number: result[i].group_number,
            topic: result[i].topic,
            number_members: result[i].number_members,
            start_presentation: result[i].start_presentation,
            duration_presentation: result[i].duration_presentation,
            end_presentation: result[i].end_presentation,
            room: result[i].room,
            date: result[i].date,
            occasion: result[i].occasion,
            module: result[i].module

        });
    }
        for (let i = 0; i< resultpr.length;i++) {
            m.push({

            });
        }
        return m;
    }


Loadresult = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT * FROM AGENDA",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

LoadDresults = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT room, occasion, date, module FROM presentation",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};




module.exports = groupOrder;