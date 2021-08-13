let con = require('./mysql');
const express = require('express');
const liveTracking  = express.Router();


liveTracking .get('/liveTrackingProf', async function  (request, result) {

    let data = await getLiveTracking();
    result.render("../view/ejs/liveTrackingProf.ejs", {
        benutzername: "Rokko",
        presentations: data,
        modulname: "Web-Technologien"
    });
});

async function getLiveTracking() {

    let data = [];
    let result = await loadLiveTracking_id()
    for (let i = 0; i < result.length; i++) {
        data.push({
            group_order: result[i].group_order,
            group_number:result[i].group_number,
            topic:result[i].topic,
            number_members:result[i].number_members,
            start_presentation:result[i].start_presentation,
            duration_presentation: result[i].duration_presentation,
            end_presentation:result[i].end_presentation,
            room: result[i].room,
            date: result[i].date,
            occasion: result[i].occasion});
    }
    return data;
}

loadLiveTracking_id = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT DISTINCT * FROM agenda WHERE presentation_id = '57'",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};
loadLiveTracking = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT  room, date, occasion FROM presentation  WHERE id = '57' ",  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};


/*
liveTracking .post('/getIdValues', function (request, result) {

    var beforeOrder = thema;
    var afterOrder =JSON.parse(request.body.afterDrag);

    for (var i=0;i<beforeOrder.length;i++)
    {
        var value = i+1;
        var sql = "UPDATE test set ordering="+ value + "  where thema = '"+afterOrder[i]+"';";
        pool.query(sql,function (err,result) {
            if (err) throw err
            console.log("Geändert");
        });
    }


    console.log(beforeOrder);
    console.log(afterOrder);
});
*/

liveTracking .post('/Livetracking', function (request,result)
{
    result.render("G4-0600.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
        benutzername: "Rokko",

        //Modulinformationen

        modulname: "Web-Technologien",

    });
});

liveTracking .post('/sendToDB', function (request,result) {
    var plusone = parseInt(request.body.i)+1;
    sqlStatement= "UPDATE agenda SET start_presentation="+"'"+request.body.start+"',Dauer='"+request.body.dauer+"',Endzeit = CAST(start_vortrag+dauer_vortrag AS TIME) WHERE Reihenfolge="+ plusone+";";
    pool.query(sqlStatement, function (err) {
        if (err) throw err;
    });
    getValuesfromDb();
    setTimeout(() => {   result.render("G4-0600.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
        benutzername: "Rokko",

        //Modulinformationen

        modulname: "Web-Technologien",


    }); }, 100)
})



module.exports = liveTracking ;