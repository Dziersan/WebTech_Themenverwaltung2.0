let con = require('./mysql');
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
    result.render("../view/ejs/groupOrder.ejs", {
        module: m
    });
});

async function getgroupOrder() {
    let m = [];
    let result = await Loadresult();
    let resultpr = await LoadDresults();
    for (let i = 0; i < result.length; i++) {
        m.push({
            group_order: result[i].group_order,
            group_number: result[i].group_number,
            topic: result[i].topic,
            number_members: result[i].number_members,
            start_presentation: result[i].start_presentation,
            duration_presentation: result[i].duration_presentation,
            end_presentation: result[i].end_presentation,
            room: resultpr[i].room,
            date: resultpr[i].date,
            occasion: resultpr[i].occasion,
            module: resultpr[i].module


        });
    }
    console.log(m)
    return m;
}


    LoadDresults = () => {
        return new Promise((resolve, reject) => {
            con.query("SELECT room, occasion, date, module FROM presentation", (error, resultpr) => {
                if (error) {
                    return reject(error);
                }
                console.log(resultpr)
                return resolve(resultpr);
            });
        });


    };

    Loadresult = () => {

        return new Promise((resolve, reject) => {
            con.query("SELECT * FROM AGENDA", (error, results) => {
                if (error) {
                    return reject(error);
                }

                return resolve(results);
            });
        });
    };






module.exports = groupOrder;