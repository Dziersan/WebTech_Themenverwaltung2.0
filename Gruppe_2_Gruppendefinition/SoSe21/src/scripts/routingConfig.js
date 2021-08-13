const express = require('express');
const session = require('express-session');
const app = express();
const connection = require('./databaseConnection.js');
const path = require("../../../../config/pathConfig.json");
const url = require('url');
var crypto = require("crypto");

// Uploading Files
const multer = require('multer');
const uuid = require('uuid').v4;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, originalname);
    }
});
const upload = multer({ storage: storage });

function getRoutes()
{
    return app;
}

//-------------------------------------------
//          Gruppenansicht Routes
//-------------------------------------------

//Ermöglicht den Dateiupload in der Gruppenansicht
app.post("/groupView/upload", upload.single('uploadAbgaben'), (request, response) =>
{
    return response.json({status: 'OK'});
});

//Füllt die Tabelle zur Ansicht aller Teilnehmer in der Gruppenansicht
app.get("/groupView/tableGroupMembers", (request, response, next) =>
{
    let groupID = request.query.grpID;
    let abfrage = `SELECT * FROM user INNER JOIN user_group on user.User_ID = user_group.User_ID INNER JOIN groups on groups.Group_ID = user_group.Group_ID WHERE groups.Group_ID = '${groupID}' AND user.Position = 'Student' ORDER BY user.surname`;
    connection.query(abfrage, function(err, result, fields)
    {
        if (err) response.send("Es konnten keine Daten abgerufen werden.");
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += "<tr><td>" + result[i].HS_ID + "</td>" + "<td>" + result[i].Name + " " + result[i].surname + "</td>" + "<td>" + result[i].E_Mail + "</td></tr>";
            }
            response.send(resultString);
        }
    });
});

//Gibt den Gruppennamen für die aktuelle Seite zurück
app.get("/groupView/captionGroupName", (request, response, next) =>
{
    let groupID = request.query.grpID;
    let abfrage = `SELECT Gruppenname FROM groups WHERE Group_ID = '${groupID}'`;
    connection.query(abfrage, function(err, result, fields)
    {
        if (err) response.send("Es konnten keine Daten abgerufen werden.");
        if (result != null && result != 'undefined')
        {
            response.send(result[0].Gruppenname);
        }
    });
});

//Zeigt alle Termine in absteigender Reihenfolge für die Gruppe an --> TODO: vergangene Termine ausblenden?!
app.get("/groupView/CalenderAppointments", (request, response, next) =>
{
    let groupID = request.query.grpID;
    let abfrage = `SELECT DATE_FORMAT(termine.Datum, '%d.%m.%Y') as Datum, Beschreibung, TIME_FORMAT(termine.Zeit, '%H:%i') as Zeit FROM termine WHERE Group_ID = '${groupID}' AND Datum >= NOW() ORDER BY Datum Limit 10`;
    connection.query(abfrage, function(err, result, fields)
    {
        if (err) response.send("Es konnten keine Daten abgerufen werden.");
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                if(result == 0)
                {
                    resultstring = "Keine Kalendereinträge vorhanden."
                }
                else
                {
                    resultString += "<li><b>" + result[i].Datum + "</b> - " + result[i].Zeit + " - " + result[i].Beschreibung + "</li>";
                }
            }
            response.send(resultString);
        }
    });
});

//Erstellt einen Termin für die aktuelle Gruppe
app.post("/groupView/calenderView/createAppointment", (request, response, next) =>
{
    const userID = request.session.userId;
    var queryString = `INSERT INTO termine(Group_ID, Beschreibung, Datum, Zeit, Ersteller_ID) VALUES ('${request.body.PageUrl}', '${request.body.Beschreibung}', '${request.body.Datum}', '${request.body.Zeit}', '${userID}');`
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    response.redirect('/groupView?grpID=' + request.body.PageUrl);
});

//Fills the table with valid members to add to the group
app.get("/groupView/memberEditView/tableAddableMembers", (request, response, next) =>
{
    const groupID = request.query.grpID;
    var queryString = `SELECT DISTINCT user.ID as User_ID, user.surname, user.Name, user.HS_ID, user.course FROM user_modul 
                        INNER JOIN user on user_modul.User_ID = user.ID 
                        INNER JOIN user_group on user.ID = user_group.User_ID 
                        INNER JOIN groups on user_group.Group_ID = groups.Group_ID
                        WHERE user.Position = 'Student' 
                        AND groups.Modul_ID = (SELECT Modul_ID FROM groups WHERE Group_ID = '${groupID}')
                        AND user.ID NOT IN (SELECT User_ID FROM user_group WHERE Group_ID = '${groupID}');`;
    connection.query(queryString, function(err, result, fields)
    {
        if (result != null)
        {
            var resultSring="";
            for (var i = 0; i < result.length; i++)
            {
                resultSring += '<tr><td>' + result[i].Name + ' ' + result[i].surname + '</td><td id="HSID'+ i +'">' + result[i].HS_ID + '</td><td id="Studiengang'+ i +'">' + result[i].course + '</td><td><form action="/groupView/memberEditView/addMember" method="POST" class="formAddTeilnehmerToGroup"><input type="hidden" name="UserID" value="'+ result[i].User_ID +'"><input type="hidden" name="GroupID" value="'+ groupID +'"><select id="rolleGroupSelectID" name="rolleGroupSelect" type="search"><option selected>Teilnehmer</option><option>Dozent</option><option>Verwalter</option></select><button id="addTeilnehmerBtn" type="submit"> Hinzufügen </button></form></td></tr>';
            }
            response.send(resultSring);
        }
    });
});

//Fills the table with valid members to remove from the group
app.get("/groupView/memberEditView/tableRemovableMembers", (request, response, next) =>
{
    const groupID = request.query.grpID;
    var queryString = `SELECT DISTINCT user.ID as User_ID, surname, Name, HS_ID, course FROM user 
                        INNER JOIN user_group on user.ID = user_group.User_ID
                        WHERE user.Position = 'Student'                         
                        AND user.ID IN (SELECT user_group.User_ID FROM user_group WHERE user_group.Group_ID = '${groupID}');`;
    connection.query(queryString, function(err, result, fields)
    {
        if (result != null)
        {
            var resultSring="";
            for (var i = 0; i < result.length; i++) {
                resultSring += '<tr><td>' + result[i].Name + ' ' + result[i].surname + '</td><td id="HSID'+ i +'">' + result[i].HS_ID + '</td><td id="Studiengang'+ i +'">' + result[i].course + '</td><td><form action="/groupView/memberEditView/removeMember" method="POST" class="formDeleteTeilnehmerFromGroup"><input type="hidden" name="UserID" value="'+ result[i].User_ID +'"><input type="hidden" name="GroupID" value="'+ groupID +'"><button id="deleteTeilnehmerBtn" type="submit"> Löschen </button></form></td></tr>';
            }
            response.send(resultSring);
        }
    });
});

//Fügt den ausgewählten Teilnehmer zur Gruppe hinzu
app.post("/groupView/memberEditView/addMember", (request, response, next) =>
{
    var queryString = `INSERT INTO user_group(User_ID, Group_ID, Rolle) VALUES ('${request.body.UserID}', '${request.body.GroupID}', '${request.body.rolleGroupSelect}')`;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    response.redirect('/groupView?grpID=' + request.body.GroupID);
});

//Löscht die Beziehung zwischen einen Teilnehmer und einer Gruppe
app.post("/groupView/memberEditView/removeMember", (request, response, next) =>
{
    var queryString = `DELETE FROM user_group WHERE User_ID = '${request.body.UserID}' AND Group_ID = '${request.body.GroupID}'`;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    response.redirect('/groupView?grpID=' + request.body.GroupID);
});

app.post("/groupView/leaveGroup",(request,response,next) =>
{
    const UserID = request.session.userId;
    const GrpID = request.body.Gruppennummer;
    console.log(UserID , GrpID);
    var queryString = `DELETE FROM user_group WHERE Group_ID = '${GrpID}' AND User_ID ='${UserID}'`;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    response.redirect('/groupOverview?');
});

//-------------------------------------------
//          Übersicht Gruppen Routes
//-------------------------------------------

app.get("/groupOverview/getMyGroupsIntoTable", (request, response, next) =>
{
    let UserID = request.session.userId;
    let query = `SELECT  grou.Group_ID as Group_ID, grou.Gruppenname as Gruppenname ,grou.Teilnehmer_Max,DATE_FORMAT(Abgabedatum, "%a %d/%m/%Y")as Abgabedatum ,
        (SELECT  Count(user_group.User_ID) FROM groups gro
        INNER JOIN user_group ON gro.group_id = user_group.group_id
        WHERE gro.Group_ID = grou.Group_ID and user_group.Rolle = 'Teilnehmer') as Teilnehmer,
        (Select Name as Name_Dozent From user where user.ID =
        (SELECT  um.User_ID FROM groups gr
        INNER JOIN user_group ON gr.group_id = user_group.group_id
        INNER JOIN user ON user_group.User_ID = user.ID
        INNER JOIN modul ON gr.modul_id = modul.modul_id
        INNER JOIN user_modul um on modul.Modul_ID = um.Modul_ID
        WHERE  user.ID = '${UserID}' and gr.Group_ID = grou.Group_ID and  um.Rolle= 'Dozent')) as Name,
        (Select surname as surname_Dozent From user where user.ID =
        (SELECT  um.User_ID FROM groups gr
        INNER JOIN user_group ON gr.group_id = user_group.group_id
        INNER JOIN user ON user_group.User_ID = user.ID
        INNER JOIN modul ON gr.modul_id = modul.modul_id
        INNER JOIN user_modul um on modul.Modul_ID = um.Modul_ID
        WHERE user.ID = '${UserID}' and gr.Group_ID = grou.Group_ID and  um.Rolle= 'Dozent')) as surname
        FROM groups grou
        INNER JOIN user_group ON grou.group_id = user_group.group_id
        INNER JOIN user ON user_group.User_ID = user.ID
        INNER JOIN modul ON grou.modul_id = modul.modul_id
        INNER JOIN user_modul um on modul.Modul_ID = um.Modul_ID
        WHERE user.ID = '${UserID}' and  um.Rolle= 'Dozent' AND grou.Active = true
        ORDER BY Gruppenname`;
    connection.query(query, function(err, result, fields)
    {
        if (result != null) {
            var resultSring="";
            for (var i = 0; i < result.length; i++) {
                resultSring += '<tr><td><a href="/groupView?grpID=' + result[i].Group_ID  + '">'  + result[i].Gruppenname + "</a></td>" + "<td>" + result[i].Name + " " + result[i].surname + "</td>" + "<td>" + result[i].Teilnehmer + "</td>" + "<td>" + result[i].Teilnehmer_Max + "</td>" + "<td>" + result[i].Abgabedatum + "</td></tr>";
            }
            response.send(resultSring);
        }
    });
});

//-------------------------------------------
//          Modulansicht Routes
//-------------------------------------------

// -> loading Header of moduleView.html
app.get("/moduleView/Header", (request, response, next) => {
    let modulID = request.query.modulID;
    let query = `SELECT Modulname from modul
                 WHERE Modul_ID = '${modulID}'` ;
    connection.query(query, function(err, result, fields)
    {
        if (result != null) {
            var resultSring="";
            for (var i = 0; i < result.length; i++) {
                resultSring += "<tr><td>" + result[i].Modulname + "</td></tr>";
            }
            response.send(resultSring);
        }
    });
});

// -> loading all modul participants in the first table of moduleView.html
app.get("/moduleView/moduleParticipants", (request, response, next) => {
    let modulID = request.query.modulID;
    let query = `SELECT surname, Name, HS_ID, course from user u
                                                                       INNER JOIN user_modul um on u.ID = um.User_ID
                 where Modul_ID ='${modulID}' and Rolle = 'Teilnehmer'` ;
    connection.query(query, function(err, result, fields)
    {
        if (result != null) {
            var resultSring="";
            for (var i = 0; i < result.length; i++) {
                resultSring += "<tr><td>" + result[i].Name + " " + result[i].surname + "</td><td>" + result[i].HS_ID + "</td><td>" + result[i].course + "</td></tr>";
            }
            response.send(resultSring);
        }
    });
});

// -> loading all modulgroups in the second table of moduleView.html
app.get("/moduleView/moduleGroups", (request, response, next) => {
    let modulID = request.query.modulID;
    let query = `SELECT Gruppenname, Teilnehmer_Max, gr.Group_ID as groupID, gr.Active as Zustand,gr.Beitritt as Beitritt,
                (SELECT surname from user u
                INNER JOIN user_modul um on u.ID = um.User_ID
                WHERE Rolle = 'Dozent' AND Modul_ID = '${modulID}') as surname,
                (SELECT Name from user u
                INNER JOIN user_modul um on u.ID = um.User_ID
                WHERE Rolle = 'Dozent' AND Modul_ID = '${modulID}') as Name,
                (SELECT  Count(user_group.User_ID) FROM groups gro
                INNER JOIN user_group ON gro.group_id = user_group.group_id
                WHERE gro.Group_ID = gr.Group_ID and user_group.Rolle = 'Teilnehmer') as Teilnehmeranzahl
                from groups as gr
                WHERE Modul_ID ='${modulID}'` ;
    connection.query(query, function(err, result, fields)
    {
        if (result != null)
        {
            var resultSring="";
            for (var i = 0; i < result.length; i++) {
                if(result[i].Beitritt ==1) {
                    if (result[i].Zustand == 1)
                    {
                        resultSring += '<tr><td><a href="/groupView?grpID=' + result[i].groupID + '">' + result[i].Gruppenname + "</a></td><td>" + result[i].Teilnehmeranzahl + "</td><td>" + result[i].Teilnehmer_Max + "</td><td><form action='/moduleView/editGroupsView/joinStopGroup' method='POST' onsubmit='window.location.reload()'><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button red'>Beitritt sperren</button></form></td><td><form action='/moduleView/editGroupsView/inaktiveGroup' method='POST' ><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button red'>Deaktivieren</button></form></td><td><form action='/moduleView/deleteGroupsView/deleteGroups' method='POST' ><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button red'>Löschen</button></form></td></tr>";
                    }
                    else
                    {
                        resultSring += '<tr><td><a href="/groupView?grpID=' + result[i].groupID + '">' + result[i].Gruppenname + "</a></td><td>" + result[i].Teilnehmeranzahl + "</td><td>" + result[i].Teilnehmer_Max + "</td><td><form action='/moduleView/editGroupsView/joinStopGroup' method='POST' onsubmit='window.location.reload()'><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button red'>Beitritt sperren</button></form></td><td><form action='/moduleView/editGroupsView/aktiveGroup' method='POST' ><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button green'>Aktivieren</button></form></td><td><form action='/moduleView/deleteGroupsView/deleteGroups' method='POST' ><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button red'>Löschen</button></form></td></tr>";
                    }
                }
                else
                {
                    if (result[i].Zustand == 1)
                    {
                        resultSring += '<tr><td><a href="/groupView?grpID=' + result[i].groupID + '">' + result[i].Gruppenname + "</a></td><td>" + result[i].Teilnehmeranzahl + "</td><td>" + result[i].Teilnehmer_Max + "</td><td><form action='/moduleView/editGroupsView/joinGroup' method='POST' onsubmit='window.location.reload()'><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button green'>Beitritt freigeben</button></form></td><td><form action='/moduleView/editGroupsView/inaktiveGroup' method='POST' ><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button red'>Deaktivieren</button></form></td><td><form action='/moduleView/deleteGroupsView/deleteGroups' method='POST' ><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button red'>Löschen</button></form></td></tr>";
                    }
                    else
                    {
                        resultSring += '<tr><td><a href="/groupView?grpID=' + result[i].groupID + '">' + result[i].Gruppenname + "</a></td><td>" + result[i].Teilnehmeranzahl + "</td><td>" + result[i].Teilnehmer_Max + "</td><td><form action='/moduleView/editGroupsView/joinGroup' method='POST' onsubmit='window.location.reload()'><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button green'>Beitritt freigeben</button></form></td><td><form action='/moduleView/editGroupsView/aktiveGroup' method='POST' ><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button green'>Aktivieren</button></form></td><td><form action='/moduleView/deleteGroupsView/deleteGroups' method='POST' ><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='ModulIDÜbergabe2' value='" + modulID + "'><button type='submit' class ='button red'>Löschen</button></form></td></tr>";
                    }
                }
            }
            response.send(resultSring);
        }
    });
});

// -> loading all modulgroups in the second table of moduleView_admin.html
app.get("/moduleViewUser/moduleGroups", (request, response, next) => {
    let modulID = request.query.modulID;
    let userID = request.session.userId;
    let query = `SELECT gr.Beitritt as Beitritt, Gruppenname, Teilnehmer_Max, gr.Group_ID as groupID,
        (SELECT surname from user u
    INNER JOIN user_modul um on u.ID = um.User_ID
    WHERE Rolle = 'Dozent' AND Modul_ID = '${modulID}') as surname,
        (SELECT Name from user u
    INNER JOIN user_modul um on u.ID = um.User_ID
    WHERE Rolle = 'Dozent' AND Modul_ID = '${modulID}') as Name,
        (SELECT  Count(user_group.User_ID) FROM groups gro
            INNER JOIN user_group ON gro.group_id = user_group.group_id
            WHERE gro.Group_ID = gr.Group_ID and user_group.Rolle = 'Teilnehmer') as Teilnehmeranzahl
    from groups as gr
    WHERE Modul_ID ='${modulID}' AND gr.Active = true`;
    connection.query(query, function(err, result, fields)
    {
        if (result != null)
        {
            var resultSring="";
            for (var i = 0; i < result.length; i++)
            {
                if (result[i].Beitritt == 1 && result[i].Teilnehmeranzahl <= result[i].Teilnehmer_Max)
                {
                    resultSring += '<tr><td><a href="/groupView?grpID=' + result[i].groupID  + '">'  + result[i].Gruppenname + "</a></td><td>"  + result[i].Teilnehmeranzahl + "</td><td>" + result[i].Teilnehmer_Max + "</td><td><form action='/moduleViewUser/joinGroup' method='POST' ><input type='hidden' name='Gruppennummer' value='" + result[i].groupID + "'><input type='hidden' name='userID' value='" + userID + "'><button type='submit' class ='button blue'>beitreten</button></form></td></tr>";
                }
                else
                {
                    resultSring += '<tr><td><a href="/groupView?grpID=' + result[i].groupID  + '">'  + result[i].Gruppenname + "</a></td><td>"  + result[i].Teilnehmeranzahl + "</td><td>" + result[i].Teilnehmer_Max + "</td><td><button type='submit' disabled='disabled' class='button'>beitreten</button></form></td></tr>";
                }
            }
            response.send(resultSring);
        }
    });
});

// -> loading all module participants in the table of the popup "deleteParticipant" of moduleView.html
app.get("/moduleView/deleteParticipantsView/moduleParticipants", (request, response, next) => {
    let modulID = request.query.modulID;
    let query = `SELECT u.ID, surname, Name, HS_ID, course from user u
                 INNER JOIN user_modul um on u.ID = um.User_ID
                 where Modul_ID ='${modulID}' and Rolle = 'Teilnehmer'` ;
    connection.query(query, function(err, result, fields)
    {
        if (result != null)
        {
            var resultSring="";
            for (var i = 0; i < result.length; i++) {
                resultSring += '<tr><td>' + result[i].Name + ' ' + result[i].surname + '</td><td>' + result[i].HS_ID + '</td><td>' + result[i].course + '</td><td><form action="/moduleView/deleteParticipantsView/deleteParticipantFromModule" method="POST"><input type="hidden" name="UserID" value="'+ result[i].ID +'"><input type="hidden" name="ModulID" value="'+ modulID +'"><button id="deleteTeilnehmerBtn" type="submit"> Löschen </button></form></td></tr>';
            }
            response.send(resultSring);
        }
    });
});

// -> delete participant from module
app.post("/moduleView/deleteParticipantsView/deleteParticipantFromModule", (request, response, next) => {
    var queryString = `DELETE FROM user_modul WHERE User_ID = '${request.body.UserID}' AND Modul_ID = '${request.body.ModulID}'`;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    response.redirect('/moduleView?modulID=' + request.body.ModulID);
});

// -> insert new
app.post("/moduleView/insertGroupsView/insertGroups", (request,response, next) =>
{
    var insertString = `BEGIN;
    INSERT INTO groups (Modul_ID,Gruppenname, Teilnehmer_Max, Abgabedatum,Beitritt, Active) VALUES ('${request.body.ModulIDÜbergabe}','${request.body.modulName}', '${request.body.MaxTeilnehmer}', '${request.body.Abgabedatum}',true,true);
    INSERT INTO user_group (User_ID,Group_ID,Rolle) VALUES ('${request.session.userId}',last_insert_id(),'Dozent');
    INSERT INTO termine(Group_ID,Beschreibung, Datum, Ersteller_ID, Zeit) VALUES (last_insert_id(),'Abgabedatum', '${request.body.Abgabedatum}', '${request.session.userId}','23:59');
    COMMIT;`;
    connection.query(insertString, function (err, data)
    {
        if (err) throw err;
    });
    response.redirect('/moduleView?modulID='+ request.body.ModulIDÜbergabe );
});

app.post("/moduleView/deleteGroupsView/deleteGroups", (request,response,next) =>
{
    const GrpNmr = request.body.Gruppennummer;
    var queryString= `DELETE FROM groups WHERE Group_ID= '${GrpNmr}'`;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    response.redirect('/moduleView?modulID='+ request.body.ModulIDÜbergabe2 );
});

//Teilnehmer des Moduls anzeigen --> Automatische Verteilung Popup
app.get("/moduleView/groupDistributionView/tableSelectUser", (request, response, next) =>
{
    let modulID = request.query.modulID;
    let query = `SELECT user.ID, surname, Name, HS_ID, course from user
                INNER JOIN user_modul on user.ID = user_modul.User_ID
                WHERE Modul_ID ='${modulID}' and Rolle = 'Teilnehmer'
                EXCEPT
                Select user.ID, surname, Name, HS_ID, course from user
                Inner Join user_group ug on user.ID = ug.User_ID
                Inner JOIN groups g on ug.Group_ID = g.Group_ID
                Where g.Modul_ID = '${modulID}' and g.Active = '1'`;
    connection.query(query, function(err, result, fields)
    {
        if (result != null)
        {
            var resultSring="";
            for (var i = 0; i < result.length; i++)
            {
                resultSring += '<tr><td><input class="selectBoxUsers" type="checkbox" name="selectedUser" value="' + result[i].ID +'"></td><td>' + result[i].Name + ' ' + result[i].surname + '</td><td>' + result[i].HS_ID + '</td><td>' + result[i].course + '</td></tr>';
            }
            response.send(resultSring);
        }
    });
});

//Gruppen des Moduls anzeigen --> Automatische Verteilung Popup
app.get("/moduleView/groupDistributionView/tableSelectGroups", (request, response, next) =>
{
    let modulID = request.query.modulID;
    let insertString = `SELECT Group_ID, Gruppenname, Teilnehmer_Max, Abgabedatum FROM groups WHERE Modul_ID = '${modulID}' and Active = '1'` ;
    connection.query(insertString, function(err, result, fields)
    {
        if (result != null)
        {
            var resultSring="";
            for (var i = 0; i < result.length; i++)
            {
                resultSring += '<tr><td><input class="selectBoxGroups" type="checkbox" name="selectedGroup" value="'+ result[i].Group_ID +'"></td><td>' + result[i].Gruppenname + '</td><td>Leer</td><td>Leer</td></tr>';
            }
            response.send(resultSring);
        }
    });
});

//Ausgewählte User werden automatisch auf die ausgewählten Gruppen verteilt --> TODO: User, die bereits eine Gruppe haben nicht anzeigen lassen
app.post("/moduleView/groupDistributionView/autoRollGroups", (request, response, next) =>
{
    var selectedGroups = request.body.selectedGroup;
    var selectedUsers = request.body.selectedUser;


    if (typeof selectedGroups === "undefined" || typeof selectedUsers === "undefined")
    {
        response.write("<script>alert('Es muss mindestens eine Gruppe und ein User ausgewaehlt werden!')</script>");
        response.write("<script>window.history.back();</script>");
    }
    else
    {
        var randomizer = function()
        {
            return Math.random()-0.5;
        };
        selectedUsers = selectedUsers.sort(randomizer);
        var j = 0;
        var i = 0;
        var groupSize = selectedUsers.length / selectedGroups.length;
        groupSize = Math.ceil(groupSize);

        for (i; i < selectedGroups.length; i++)
        {
            for (j; j < groupSize; j++)
            {
                var insertString = `INSERT INTO user_group(User_ID, Group_ID) VALUES ('${selectedUsers[j]}', '${selectedGroups[i]}');`
                connection.query(insertString, function(err, result, fields)
                {
                    if (err) throw err;
                });
            }
            groupSize += groupSize;
            if (groupSize > selectedUsers.length)
                groupSize = selectedUsers.length;
        }
        response.redirect('/moduleView?modulID=' + request.body.PageUrl);
    }
});

app.use(express.json());
app.post("/moduleView/addMemberView/userLookup", (request, response, next) =>
{
    const modulID = request.query.modulID;
    const value = request.body.value;
    const type = request.body.type;
    var queryString = `SELECT user.ID, Name, surname, HS_ID as Matrikelnummer, course FROM user WHERE ${type} LIKE '%${value}%' AND ID NOT IN (SELECT User_ID FROM user_modul WHERE user_modul.Modul_ID = '${modulID}') ORDER BY surname;`;
    connection.query(queryString, function(err, result, fields)
    {
        if (result.length > 0)
        {
            var resultSring="";
            for (var i = 0; i < result.length; i++)
            {
                resultSring += '<tr><td>' + result[i].Name + ' ' + result[i].surname + '</td><td id="HSID'+ i +'">' + result[i].Matrikelnummer + '</td><td id="Studiengang'+ i +'">' + result[i].course + '</td><td><form action="/moduleView/addMemberView/addMember" method="POST" class="formAddTeilnehmerToModule" onsubmit="<script>window.location.reload()</script>"><select id="rolleSelectID" name="rolleSelect" type="search"><option selected>Teilnehmer</option><option>Verwalter</option></select></input><input type="hidden" name="UserID" value="'+ result[i].ID +'"><input type="hidden" name="ModulID" value="'+ modulID +'"><button id="addTeilnehmerToModuleBtn" type="submit"> Hinzufügen </button></form></td></tr>';
            }
            response.send(resultSring);
        }
        else if (result.length <= 0)
        {
            response.send("Keine Benutzer gefunden.")
        }
    });
});

//-> user join in group
app.post("/moduleViewUser/joinGroup",(request,response,next) =>
{
    const GrpNmr = request.body.Gruppennummer;
    let userID = request.session.userId;
    var queryString = `BEGIN;
                            IF ('${userID}' NOT IN (SELECT User_ID FROM user_group WHERE Group_ID = '${GrpNmr}'))
                            THEN INSERT INTO user_group (User_ID, Group_ID, Rolle) VALUES ('${request.body.userID}','${GrpNmr}', 'Teilnehmer');
                            END IF;
                            COMMIT;`;
    connection.query(queryString, function (err, data) {
        if (err) throw err;
    });
    response.redirect('/groupView?grpID='+ GrpNmr);
});

//Fügt den ausgewählten Teilnehmer zur Gruppe hinzu
app.post("/moduleView/addMemberView/addMember", (request, response, next) =>
{
    var queryString = `INSERT INTO user_modul(User_ID, Modul_ID, Rolle) VALUES ('${request.body.UserID}', '${request.body.ModulID}', '${request.body.rolleSelect}')`;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    response.redirect('/moduleView?modulID=' + request.body.ModulID);
});

app.post("/moduleView/editGroupsView/aktiveGroup",(request,response,next) =>
{
    const GrpNmr = request.body.Gruppennummer;
    var queryString= `UPDATE groups SET Active = true Where Group_ID ='${GrpNmr}';`;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    //response.send("<script>window.location.href('http://localhost:3000/moduleView?modulID=1');</script>");
    response.redirect('/moduleView?modulID='+ request.body.ModulIDÜbergabe2);
});

app.post("/moduleView/editGroupsView/inaktiveGroup",(request,response,next) =>
{
    const GrpNmr = request.body.Gruppennummer;
    var queryString= `UPDATE groups SET Active = false Where Group_ID ='${GrpNmr}';`;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    //response.send("<script>window.location.href('http://localhost:3000/moduleView?modulID=1');</script>");
    response.redirect('/moduleView?modulID='+ request.body.ModulIDÜbergabe2);
});

app.post("/moduleView/editGroupsView/joinGroup",(request,response,next) =>
{
    const GrpNmr = request.body.Gruppennummer;
    var queryString= `UPDATE groups SET Beitritt = true Where Group_ID ='${GrpNmr}' `;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    //response.send("<script>window.location.href('http://localhost:3000/moduleView?modulID=1');</script>");
    response.redirect('/moduleView?modulID='+ request.body.ModulIDÜbergabe2 );
});

app.post("/moduleView/editGroupsView/joinStopGroup",(request,response,next) =>
{
    const GrpNmr = request.body.Gruppennummer;
    var queryString= `UPDATE groups SET Beitritt = false Where Group_ID ='${GrpNmr}' `;
    connection.query(queryString, function(err, data)
    {
        if (err) throw err;
    });
    //response.send("<script>window.location.href('http://localhost:3000/moduleView?modulID=1');</script>");
    response.redirect('/moduleView?modulID='+ request.body.ModulIDÜbergabe2);
});

app.get("/moduleView/createInviteCode", (request, response, next) =>
{
    const modulID = request.query.modulID;
    var randomInviteCode = crypto.randomBytes(10).toString('hex');
    var queryString= `BEGIN; DELETE FROM inviteCodes WHERE Modul_ID = '${modulID}'; INSERT INTO inviteCodes(inviteCode, Modul_ID, Enddate) VALUES ('${randomInviteCode}', '${modulID}', (select now() + interval 5 day)); COMMIT;`;
    connection.query(queryString, function(err, data)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            response.send(randomInviteCode);
        }
    });
})

//-------------------------------------------
//          Übersicht Module Routes
//-------------------------------------------

//Auflistung aller Module des angemeldeten Users
app.get("/moduleOverview/myModules", (request, response, next) => {
    let userID = request.session.userId;
    let query = `SELECT DISTINCT m.Modulname, m.semester, m.Pruefungsform, m.Modul_ID, (SELECT user.surname FROM modul 
                INNER JOIN user_modul on modul.Modul_ID = user_modul.Modul_ID
                INNER JOIN user on user_modul.User_ID = user.ID
                 WHERE Rolle = 'Dozent' and modul.Modul_ID = m.Modul_ID) as surname FROM modul m
                 INNER JOIN user_modul on m.Modul_ID = user_modul.Modul_ID
                 INNER JOIN user on user_modul.User_ID = user.ID
                 WHERE user.ID = '${userID}' ORDER BY m.Modulname;`;
    connection.query(query, function(err, result, fields)
    {
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += "<tr><td><a href='/moduleView?modulID="
                    + result[i].Modul_ID + "'>" + result[i].Modulname + "</a></td>"
                    + "<td>" + result[i].surname + "</td>" + "<td>"
                    + result[i].semester + "</td>" + "<td>" + result[i].Pruefungsform + "</td></tr>";
            }
            response.send(resultString);
        }
    });
});

//Einfügen eines neuen Moduls in die Übersicht in Übersicht_Module.html
app.post("/moduleOverview/createModulView/insertModul", (request, response, next) =>
{
    const modulInput = request.body;
    var userID = request.session.userId;
    var insertString = `BEGIN; INSERT INTO modul (Modulname, Teilnehmer_Max, Semester, Pruefungsform) VALUES ('${request.body.modulName}', '${request.body.MaxTeilnehmer}', '${request.body.Semester}', '${request.body.Pruefungsform}'); INSERT INTO user_modul (User_ID, Modul_ID, Rolle) VALUES ('${userID}', last_insert_id(), '${request.body.Rolle}'); COMMIT;`;
    connection.query(insertString, function (err, data)
    {
        if (err) throw err;
    });
    response.redirect('/moduleOverview');
});

//Auflistung aller existierenden Module mit Möglichkeit zur Löschung
app.get("/moduleOverview/deleteModulView/listEveryModul", (request, response, next) => {
    var queryString = `SELECT modul.Modul_ID, modul.Modulname FROM modul INNER JOIN user_modul on user_modul.Modul_ID = modul.Modul_ID WHERE user_modul.User_ID = '${request.session.userId}';`;
    connection.query(queryString, function (err, result, fields)
    {
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += '<tr><td>' + result[i].Modul_ID + '</td><td>' + result[i].Modulname +
                    '</td><td><form action="/moduleOverview/deleteModulView/deleteModul" method="post"><input type="hidden" name="ModulID" value="'
                    + result[i].Modul_ID + '"><button type="submit" id="deleteModulBtn">Löschen</button></form></td></tr>';
            }
            response.send(resultString);
        }
    });
});

// Endgültige Löschung eines Moduls
app.post("/moduleOverview/deleteModulView/deleteModul", (request,response, next) =>
{
    const modulInput = request.body;
    var deleteString = `DELETE FROM modul WHERE Modul_ID = '${request.body.ModulID}';`;
    connection.query(deleteString, function (err, data)
    {
        if (err) throw err;
    });
    response.redirect('/moduleOverview');
});

app.post("/moduleOverview/joinModuleViaCode", (request, response, next) =>
{
    const userID = request.session.userId;
    var insertString = `SELECT Modul_ID as Modul_ID FROM inviteCodes WHERE inviteCode = '${request.body.inviteCode}'`;
    connection.query(insertString, function (err, result, fields)
    {
        if (result.length > 0)
        {
            if (err) throw err;
            var modulID = result[0].Modul_ID;
            var insertString = `BEGIN;
                                IF ('${userID}' NOT IN (SELECT User_ID FROM user_modul WHERE Modul_ID = '${modulID}' AND Rolle = 'Teilnehmer') AND (SELECT Enddate FROM inviteCodes WHERE inviteCode = '${request.body.inviteCode}') >= NOW())
                                THEN INSERT INTO user_modul(User_ID, Modul_ID, Rolle) VALUES ('${userID}', '${modulID}', 'Teilnehmer');
                                END IF;
                                COMMIT;`
            connection.query(insertString, function (err, result, fields)
            {
                if (err) throw err;
                response.redirect('/moduleView?modulID=' + modulID);
            });
        }
        else if (result.length <= 0)
        {
            if (err) throw err;
            response.send("<script>alert('Es ist ein Problem aufgetreten. Bitte ueberpruefe den Invite Code.'); window.history.back();</script>");
        }
    });
});

//-------------------------------------------
//              General Routes
//-------------------------------------------

app.get("/groupView", (request, response) =>
{
    var groupID = request.query.grpID;
    var validateURL = `SELECT Group_ID FROM groups WHERE Group_ID = '${groupID}';`;
    connection.query(validateURL, function(err, result1, fields)
    {
        if (result1.length <= 0)
        {
            response.send("<script>alert('Group does not exist!'); window.history.back();</script>");
        }
        else if (result1.length > 0)
        {
            var userID = request.session.userId;
            var groupID = request.query.grpID;
            var validateString = `SELECT User_ID FROM user_group WHERE User_ID = '${userID}' AND Group_ID = '${groupID}';`;
            connection.query(validateString, function(err, result2, fields)
            {
                if (result2.length > 0)
                {
                    if (request.session.userAuthorization == 'Student')
                    {
                        response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/groupView.html');
                    }
                    else if (request.session.userAuthorization == 'Dozent')
                    {
                        response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/groupView_admin.html');
                    }
                }
                else if (result2.length <= 0)
                {
                    response.send("<script>alert('Access Denied!'); window.history.back();</script>");
                }
            });
        }
    });
});

app.get("/groupOverview", (request, response) =>
{
    response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/groupOverview.html');
});

app.get("/moduleView", (request, response) =>
{
    var validateURL = `SELECT Modul_ID FROM modul WHERE Modul_ID = '${request.query.modulID}'`;
    connection.query(validateURL, function(err, result1, fields)
    {
        if (result1.length <= 0)
        {
            response.send("<script>alert('Module does not exist!'); window.history.back();</script>");
        }
        else if (result1.length > 0)
        {
            var userID = request.session.userId;
            var validateUser = `SELECT User_ID, Rolle FROM user_modul WHERE User_ID = '${userID}' AND Modul_ID = '${request.query.modulID}'`;
            connection.query(validateUser, function(err, result2, fields)
            {
                if (result2.length > 0)
                {
                    if (result2[0].Rolle == 'Teilnehmer')
                    {
                        response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/moduleView.html');
                    }
                    else if (result2[0].Rolle == 'Dozent' || result2[0].Rolle == 'Verwalter')
                    {
                        response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/moduleView_admin.html');
                    }
                }
                else if (result2.length <= 0)
                {
                    response.send("<script>alert('Access Denied!'); window.history.back();</script>");
                }
            });
        }
    });
});

app.get("/moduleOverview", (request, response) =>
{
    if (request.session.userAuthorization == 'Student')
    {
        response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/moduleOverview.html');
    }
    else if (request.session.userAuthorization == 'Dozent')
    {
        response.sendFile(path.path + '/Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung/moduleOverview_admin.html');
    }
});

module.exports = getRoutes();