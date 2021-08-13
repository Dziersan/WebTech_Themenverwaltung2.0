let con = require('./mysql');
const express = require('express');
const inquiryDozent = express.Router();


inquiryDozent.get('/inquiryDozent',  function (request, response) {
    //let data = await getG4_0900();
    response.render("../view/ejs/inquiryDozent.ejs", {
        benutzername: "Test",
        Gruppennummer: "2",
        /*presentations: data*/

    });
});


/**
 * Werte aus dem Formular in die Relation Nachrichten einfügen
 */
// CALL OF the form sendMessage

inquiryDozent.post('/sendMessage', function (request, result) {

    var sql = "INSERT INTO messages(group_id,message,date,type) VALUES("+"'"+
        parseInt(request.body.group_id) + "','"+ request.body.message + "','" + request.body.date + "','"
        + request.body.dateRequestQuestion + "');";
    con.query(sql, function (err) {
        if (err) throw err;
    });
    //JS auf ejs laden und aufrufen
    result.render("../view/ejs/inquiryDozent.ejs", {
        Gruppennummer: "2",
    });

});

module.exports = inquiryDozent;
/**
 * Listening auf Server
 */