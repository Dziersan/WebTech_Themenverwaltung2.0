const express = require('express');
const session = require('express-session');
const multer = require('multer');
const uuid = require('uuid').v4;
const app = express();
const connection = require('../scripts/databaseConnection.js');
const path = require("../../../../config/pathConfig.json");
const upload = multer({ dest: 'uploads/' });

function getRoutes()
{
    return app;
}

//-------------------------------------------
//          Gruppenansicht Routes
//-------------------------------------------

function getStudentData (request, response, next)
{
    let userID = request.session.userId;
    console.log(userID);
    let query = "SELECT * FROM User ORDER BY 'Nachname'";
    connection.query(query, function(err, result, fields)
    {
        if (err) response.send("Es konnten keine Daten abgerufen werden.");
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += "<tr><td>" + result[i].User_ID + "</td>" + "<td>" + result[i].Vorname + " " + result[i].Nachname + "</td>" + "<td>" + result[i].E_Mail + "</td></tr>";
                console.log(resultString);
            }
            response.send(resultString);
        }
    });
}

app.post("/upload", upload.single('abgabe'), (request, response) => {
    console.log("Upload");
    return response.json({status: 'OK'});
});

app.get("/getStudentsIntoTable", getStudentData);

//-------------------------------------------
//          Übersicht Gruppen Routes
//-------------------------------------------

function getMyGroups(request, response, next) {
    let UserID = request.session.userId;
    let query = `SELECT  grou.Beschreibung as Beschreibung ,grou.Teilnehmer_Max,DATE_FORMAT(Abgabedatum, "%a %d/%m/%Y")as Abgabedatum ,
                (SELECT  Count(user_group.User_ID) as Teilnehmer FROM groups gro
                INNER JOIN user_group ON gro.group_id = user_group.group_id
                WHERE gro.Beschreibung = grou.Beschreibung) as Teilnehmer,
                (Select Vorname as Vorname_Dozent From user where user.User_ID =
                (SELECT  um.User_ID FROM groups gr
                INNER JOIN user_group ON gr.group_id = user_group.group_id
                INNER JOIN user ON user_group.User_ID = user.User_ID
                INNER JOIN modul_group ON gr.group_id = modul_group.group_id
                INNER JOIN modul ON modul_group.modul_id = modul.modul_id
                INNER JOIN user_modul um on modul.Modul_ID = um.Modul_ID
                WHERE  user.User_ID = '${UserID}' and gr.Group_ID = grou.Group_ID and  um.Rolle= 'Lehrbeauftragter')) as Vorname,
                (Select Nachname as Nachname_Dozent From user where user.User_ID =
                (SELECT  um.User_ID FROM groups gr
                INNER JOIN user_group ON gr.group_id = user_group.group_id
                INNER JOIN user ON user_group.User_ID = user.User_ID
                INNER JOIN modul_group ON gr.group_id = modul_group.group_id
                INNER JOIN modul ON modul_group.modul_id = modul.modul_id
                INNER JOIN user_modul um on modul.Modul_ID = um.Modul_ID
                WHERE user.User_ID = '${UserID}' and gr.Group_ID = grou.Group_ID and  um.Rolle= 'Lehrbeauftragter')) as Nachname
                FROM groups grou
                INNER JOIN user_group ON grou.group_id = user_group.group_id
                INNER JOIN user ON user_group.User_ID = user.User_ID
                INNER JOIN modul_group ON grou.group_id = modul_group.group_id
                INNER JOIN modul ON modul_group.modul_id = modul.modul_id
                INNER JOIN user_modul um on modul.Modul_ID = um.Modul_ID
                WHERE user.User_ID = '${UserID}' and  um.Rolle= 'Lehrbeauftragter'
                ORDER BY Abgabedatum;` ;
    connection.query(query, function(err, result, fields)
    {
        if (result != null) {
            var resultSring="";
            for (var i = 0; i < result.length; i++) {
                resultSring += "<tr><td><a  onclick='myClick'>"  + result[i].Beschreibung + "</a></td>" + "<td>" + result[i].Vorname + " " + result[i].Nachname + "</td>" + "<td>" + result[i].Teilnehmer + "</td>" + "<td>" + result[i].Teilnehmer_Max + "</td>" + "<td>" + result[i].Abgabedatum + "</td></tr>";
            }
            response.send(resultSring);
        }
    });
}

app.get("/getMyGroupsIntoTable", getMyGroups);

//-------------------------------------------
//          Modulansicht Routes
//-------------------------------------------

// Missing

//-------------------------------------------
//          Übersicht Module Routes
//-------------------------------------------

function getModulesIntoTable (request, response, next)
{
    let query = `SELECT modul.beschreibung, modul.semester, modul.Pruefungsform, modul.Modul_ID, user.Nachname FROM modul
                INNER JOIN user_modul on modul.Modul_ID = user_modul.Modul_ID
                INNER JOIN user on user_modul.User_ID = user.User_ID
                WHERE user.Position = "Dozent";`;
    connection.query(query, function(err, result, fields)
    {
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += "<tr><td>" + result[i].beschreibung + "</td>" + "<td>" + result[i].Nachname + "</td>" + "<td>" + result[i].semester + "</td>" + "<td>" + result[i].Pruefungsform + "</td>" + "<td><button type='button' class='' id='Btn" + result[i].Modul_ID + "'>Beitreten</button></td></tr>";
            }
            response.send(resultString);
        }
    });
}

function filteredModules (request, response, next)
{
    let userID = request.session.userId;
    console.log(userID);
    let query = `SELECT m.beschreibung, m.semester, m.Pruefungsform, m.Modul_ID, (SELECT user.Nachname FROM modul 
                INNER JOIN user_modul on modul.Modul_ID = user_modul.Modul_ID
                INNER JOIN user on user_modul.User_ID = user.User_ID
                 WHERE Rolle = 'Lehrbeauftragter' and modul.Modul_ID = m.Modul_ID) as Nachname FROM modul m
                 INNER JOIN user_modul on m.Modul_ID = user_modul.Modul_ID
                 INNER JOIN user on user_modul.User_ID = user.User_ID
                 WHERE user.User_ID = '${userID}';`;
    connection.query(query, function(err, result, fields)
    {
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += "<tr><td>" + result[i].beschreibung + "</td>" + "<td>" + result[i].Nachname + "</td>" + "<td>" + result[i].semester + "</td>" + "<td>" + result[i].Pruefungsform + "</td>" + "<td><button type='button' class='' id='Btn" + result[i].Modul_ID + "'>Beitreten</button></td></tr>";
            }
            response.send(resultString);
        }
    });
}

function insertDozent(request, response, next)
{
    let query = 'SELECT * FROM user WHERE POSITION = "Dozent";';
    connection.query(query, function(err, result, fields)
    {
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += "<option value='" + result[i].Vorname + " " + result[i].Nachname + "'>";
            }
            response.send(resultString);
        }
    });
}

app.get("/getModulesIntoTable", getModulesIntoTable);

app.get("/filteredModules", filteredModules);

app.get("/insertDozent", insertDozent);

app.get("/newModule", (request, response) => {
    response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Formulare/CreateNewModul.html');
});

//-------------------------------------------
//          General Routes
//-------------------------------------------

app.get("/mygroups", (request, response) => {
    console.log("Send Gruppenansicht.html");
    response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/Gruppenansicht.html');
});

app.get("/modulverwaltung", (request, response) => {
    response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/Übersicht_Module.html');
});

app.get("/hausarbeitsthemen", (request, response) => {
    response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/Übersicht_Hausarbeitsthemen.html');
});

module.exports = getRoutes();