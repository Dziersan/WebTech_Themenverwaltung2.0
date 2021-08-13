let con = require('../Module_app_mysql_pool/mysql');
const express = require('express');
const createPresentationDatesProf = express.Router();


/**
 * JS auf ejs laden und aufrufen
 */
pid = [];
createPresentationDatesProf.get('/createPresentationDatesProf', function (request, result) {
    result.render("createPresentationDatesProf.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
    });
});

/*createPresentationDatesProf.post('/generatePresentation',  function  (request, result) {

    let data =  getPresentation();
    result.render("presentationDateProf.ejs", {
        presentations: data
    });
});*/

createPresentationDatesProf.post('/generatePresentation', async function (request, result) {
    console.log("start ");
    console.log("start");
    var sql = "INSERT INTO presentation(date,day_start,day_end,room, occasion) VALUES("+"'"+request.body.date + "', '" + request.body.start + "', '" + request.body.end + "', '" + request.body.room + "', '" + request.body.occasion  + "');";
    con.query(sql, function (err) {
        if (err) throw err;
    });
    console.log("done");

});

/**
 * Übermittlung des neuangelegten Präsentationstermins an die Datenbank
 * Speichern der Präsentationsreihenfolge in Datenbank
 */
// function submitPraesentationReihenfolge()
createPresentationDatesProf.post('/submit',   async function  (request, result) {

    var sql = "SELECT id FROM presentation WHERE date = (" + "'" + request.body.dateAgenda + "');";
    con.query(sql, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            pid[i] = result[i].id;
            console.log(pid[i]);
        }

    });


setTimeout(() => {
/*
    LoadData = () => {*/
    let test = JSON.parse(request.body.submitter);
        let sqlInsert2 = []
        for (var i = 0; i < test.length; i++) {
            //Insert in Datenbank
            sqlInsert2[i] = "INSERT INTO agenda(group_number, presentation_id, date,  topic,number_members,start_presentation,duration_presentation, end_presentation) VALUES("
                + test[i].groupNumber + ", " + null + ", '" + request.body.dateAgenda + "', '" + test[i].theme + "'," + test[i].number + ",'"
                + test[i].startTime + "','" + test[i].duration + "', '" + test[i].endTime + "');";


            //Ausführung der SQL statements
            con.query(sqlInsert2[i], function (err) {
                if (err) throw err

            });

        }
    console.log("hs")
/*    }*/;
}, 90);



});



module.exports = createPresentationDatesProf;