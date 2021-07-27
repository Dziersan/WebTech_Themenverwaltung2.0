let con = require('../Module_app_mysql_pool/mysql');
const express = require('express');
const presentationDateProf = express.Router();

presentationDateProf.get('/presentationDateProf', async function  (request, result) {

    let data = await getPresentation();
    result.render("presentationDateProf.ejs", {
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

module.exports = presentationDateProf;