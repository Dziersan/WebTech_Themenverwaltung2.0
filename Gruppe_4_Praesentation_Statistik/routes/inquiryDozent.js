let con = require('../Module_app_mysql_pool/mysql');
const express = require('express');
const inquiryDozent = express.Router();


inquiryDozent.get('/inquiryDozent',  function (request, response) {
    //let data = await getG4_0900();
    response.render("inquiryDozent.ejs", {
        benutzername: "Test",
        Gruppennummer: "2",
        /*presentations: data*/

    });
});

/*
LoadData = () =>{
    return new Promise((request, result)=>{
        con.query("INSERT INTO messages(message,date,type) VALUES("+
            request.body.message + "','" + request.body.date + "','"
            + request.body.dateRequestQuestion + "');",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};
*/

/**
 * Werte aus dem Formular in die Relation Nachrichten einfügen
 */
// CALL OF the form sendMessage

inquiryDozent.post('/sendMessage', function (request, result) {
    console.log("start ");
    var sql = "INSERT INTO messages(group_id,message,date,type) VALUES("+"'"+
        parseInt(request.body.group_id) + "','"+ request.body.message + "','" + request.body.date + "','"
        + request.body.dateRequestQuestion + "');";
    con.query(sql, function (err) {
        if (err) throw err;
    });
    //JS auf ejs laden und aufrufen
    result.render("inquiryDozent.ejs", {
        Gruppennummer: "2",
    });
    console.log("done")
});

module.exports = inquiryDozent;
/**
 * Listening auf Server
 */