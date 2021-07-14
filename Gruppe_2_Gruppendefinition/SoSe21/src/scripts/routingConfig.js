const express = require('express');
const app = require('../scripts/serverConnection.js');
const connection = require('../scripts/databaseConnection.js');
const path = require("../../../../config/pathConfig.json");

function getRoutes()
{
    return app;
}

app.get("/getStudentsIntoTable", (request, response) => {

    response.writeHead(200, {'Content-Type': 'text/html'});
    let query = "SELECT * FROM student ORDER BY 'Nachname'";
    connection.query(query, function(err, result, fields)
    {
        if (err) response.write("Es konnten keine Daten abgerufen werden.");

        for (var i = 0; i < result.length; i++)
        {
            response.write("<tr><td>" + result[i].matrikel_nr + "</td>");
            response.write("<td>" + result[i].name + " " + result[i].nachname + "</td>");
            response.write("<td>" + result[i].e_mail + "</td></tr>");
        }
        response.end();
    });
});

app.get("/gruppenAnsichtStudentsTable", function(request, response)
{
    response.writeHead(200, {'Content-Type': 'text/html'});
    let query = "SELECT * FROM student ORDER BY 'Nachname'";
    connection.query(query, function(err, result, fields)
    {
        if (err) response.write("Es konnten keine Daten abgerufen werden.");

        for (var i = 0; i < result.length; i++)
        {
            response.write("<tr><td>" + result[i].name + " " + result[i].nachname + "</td>");
            response.write("<td>" + result[i].matrikel_nr + "</td>");
            response.write("<td>" + result[i].studiengang + "</td></tr>");
        }
        response.end();
    });
});

app.get("/getMyGroupsIntoTable", (request, response) => {

    response.writeHead(200, {'Content-Type': 'text/html'});
    let user = "Rethmann";
    let query = "SELECT * FROM groups INNER JOIN student_group ON groups.group_id = student_group.group_id INNER JOIN student ON student_group.matrikel_nr = student.matrikel_nr WHERE student.matrikel_nr = '25123'";
    connection.query(query, function(err, result, fields)
    {
        if (err) response.write("Es konnten keine Daten abgerufen werden.");

        for (var i = 0; i < result.length; i++)
        {
            response.write("<tr><td>" + result[i].beschreibung + "</td>");
            response.write("<td>" + result[i].name + " " + result[i].nachname + "</td>");
            response.write("<td>" + result[i].teilnehmer_anzahl + "</td>");
            response.write("<td>" + result[i].teilnehmer_max + "</td>");
            response.write("<td>" + result[i].Abgabedatum + "</td></tr>");
        }
        response.end();
    });
});

app.get("/myGroups", (request, response) => {
    response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/Gruppenansicht.html');
});

app.get("/getModulesIntoTable", (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    let query = "SELECT modul.beschreibung, modul.semester, modul.pruefungsform, hs_mitarbeiter.name FROM modul INNER JOIN modul_mitarbeiter ON modul.modul_id = modul_mitarbeiter.modul_id INNER JOIN hs_mitarbeiter ON modul_mitarbeiter.personal_id = hs_mitarbeiter.personal_id;";
    connection.query(query, function (err, result, fields)
    {
        if (err) response.write("Es konnten keine Daten abgerufen werden.");

        for (var i = 0; i < result.length; i++)
        {
            response.write("<tr><td>" + result[i].beschreibung + "</td>")
            response.write("<td>" + result[i].name + "</td>")
            response.write("<td>" + result[i].semester + "</td>")
            response.write("<td>" + result[i].pruefungsform + "</td>")
            response.write("<td><button type='button' class='' id='Btn" + result[i].beschreibung + "'>Beitreten</button></td></tr>")
        }
        response.end();
    });
});

app.get("/myModules", (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    let query = `SELECT student.matrikel_nr, modul.beschreibung, modul.semester, modul.pruefungsform, hs_mitarbeiter.name FROM modul
                 INNER JOIN modul_mitarbeiter ON modul.modul_id = modul_mitarbeiter.modul_id
                 INNER JOIN hs_mitarbeiter ON modul_mitarbeiter.personal_id = hs_mitarbeiter.personal_id
                 INNER JOIN student_modul on modul.modul_id = student_modul.modul_id JOIN student on student_modul.matrikel_nr = student.matrikel_nr
                 WHERE student.name = "Peteasdasdrsen";`
    connection.query(query, function (err, result, fields)
    {
        if (err) response.write("Es konnten keine Daten abgerufen werden");

        for (var i = 0; i < result.length; i++)
        {
            response.write("<tr><td>" + result[i].beschreibung + "</td>")
            response.write("<td>" + result[i].name + "</td>")
            response.write("<td>" + result[i].semester + "</td>")
            response.write("<td>" + result[i].pruefungsform + "</td>")
            response.write("<td><button type='button' class='' id='Btn" + result[i].beschreibung + "'>Beitreten</button></td></tr>")
        }
        response.end();
    });

});

app.get("/insertDozent", (request, response) => {
    response.writeHead(200, {'content-Type': 'text/html'});
    let query = "SELECT * FROM hs_mitarbeiter;"
    connection.query(query, function (err, result, fields)
    {
        if (err) response.write("Es konnten keine Daten abgerufen werden");

        for (var i = 0; i < result.length; i++){
            response.write("<option value='" + result[i].nachname + " " + result[i].name + "'>")
        }
        response.end();
    });
});

app.get("/mygroups", (request, response) => {
    response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/Gruppenansicht.html');
});

app.get("/modulverwaltung", (request, response) => {
    response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/Übersicht_Module.html');
});

app.get("/hausarbeitsthemen", (request, response) => {
    response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/Übersicht_Hausarbeitsthemen.html');
});

module.exports = getRoutes();