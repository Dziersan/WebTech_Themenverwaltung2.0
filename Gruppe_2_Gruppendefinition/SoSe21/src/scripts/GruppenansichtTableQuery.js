const fs = require('fs');
const path = require("../../../../config/pathConfig.json");
const mysql = require('mysql');
const SqlString = require('mysql/lib/protocol/SqlString');
const config = JSON.parse(fs.readFileSync(path.path + "/config/datenbankConfig.json"));
var http = require('http');
var url = require('url');

let connection = mysql.createConnection(
{
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
});

connection.connect(function (err)
{
    if (err) throw (err);

    console.log("Connected successfully..!")
});

// HTTP Request
http.createServer(function (request, response)
{
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
}).listen(1337);