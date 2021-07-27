/**
 * Importieren der App und MySql-Module
 */
let con = require('../Module_app_mysql_pool/mysql');
const express = require('express');
const G4_0200fs = express.Router();





G4_0200fs.get('/G4-0200fS', async function (request, result) {
    let m = await getModuleG0200fs();

    result.render("G4-0050.ejs", {
        module: m

    });
});



/**
 * Verbindungsaufbau zur DB
 */
async function getModuleG0200fs() {
    let m = [];
    let result = await LoadDataG0200fs();
    for (let i = 0; i < result.length; i++) {
        m.push({
            group_order: result[i].group_order,
            group_number: result[i].group_number,
            topic: result[i].topic,
            number_members: result[i].number_members,
            start_presentation: result[i].start_presentation,
            duration_presentation: result[i].duration_presentation,
            end_presentaton: result[i].end_presentaton,
            room: result[i].room,
            date: result[i].date,
            occasion: result[i].occasion,
            module: result[i].module});
    }
    return m;
}


/*    async function getModuleG0200fspres() {
        let mi = [];
        let result = await LoadDataG0200fspres();
        for (let i = 0; i < result.length; i++) {
            mi.push({
                room: result[i].room,
                date: result[i].date,
                occasion: result[i].occasion,
                module: result[i].module

            });
        }
        return mi;
    }*/

        LoadDataG0200fs = () =>{
        return new Promise((resolve, reject)=>{

            con.query("SELECT room, occasion, date, module FROM presentation",  (error, results)=>{
                if(error){
                    return reject(error);
                }

                console.log(results)
                return resolve(results);
            });

            con.query("SELECT * FROM agenda",  (error, result)=>{
                if(error){
                    return reject(error);
                }
                console.log(result)
                return resolve(result);

            });



        });
};


/*        LoadDataG0200fspres = () =>{
            return new Promise((resolve, reject)=>{
                con.query("SELECT room, occasion, date, module FROM presentation",  (error, results)=>{
                    if(error){
                        return reject(error);
                    }
                    console.log("a:" + results);
                    return resolve(results);
                });
            });
        };*/


module.exports = G4_0200fs;
