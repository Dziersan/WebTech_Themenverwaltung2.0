let con = require('./mysql');
const express = require('express');
const createPresentationDatesProf = express.Router();


/**
 * JS auf ejs laden und aufrufen
 */
pid = [];
createPresentationDatesProf.get('/createPresentationDatesProf', function (request, result) {
    result.render("../view/ejs/createPresentationDates.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
    });
});


createPresentationDatesProf.post('/generatePresentation', async function (request, result) {

    var sql = "INSERT INTO presentation(date,day_start,day_end,room, occasion) VALUES("+"'"+request.body.date + "', '" + request.body.start + "', '" + request.body.end + "', '" + request.body.room + "', '" + request.body.occasion  + "');";
    con.query(sql, function (err) {
        if (err) throw err;
    });

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

/*    }*/;
}, 60);



});



module.exports = createPresentationDatesProf;