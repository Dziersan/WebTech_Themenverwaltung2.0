// contains INSERT queries 
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const postRouter = express.Router();
const connection = require("../services/getDatabaseConnection.js");
// new entries for the softwarepool
postRouter.post('/insert', (req, res) => {
    let sql = 'INSERT INTO softwarepool(software_name, software_description, software_link) VALUES (?,?,?)';

    connection.query(sql, [req.body.software_name, req.body.software_description, req.body.software_link], (err, result) => {
        if (err) throw err;
    })
})

// saving entries for admin notification
postRouter.post('/insertNotification', (request, response) => {

    if (request.method === "OPTIONS") {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    connection.query("INSERT INTO notification (group_name, description) VALUES("
        + '"' + request.body.groupname + '",'
        + '"' + request.body.description + '")',
        function (err) {
            if (err)
                throw err;
            else {
                console.log("Requirement created");
            }
        });
    response.end();
})

postRouter.post('/insertSoftware', (request, response) => {

    if (request.method === "OPTIONS") {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    connection.query("INSERT INTO softwarepool(software_name, software_description, software_link ) VALUES("
        + '"' + request.body.software_name + '",'
        + '"' + request.body.software_description + '",'
        + '"' + request.body.software_link + '")',
        function (err) {
            if (err)
                throw err;
            else {
                console.log("Requirement created");
            }
        });
    response.end();
})



postRouter.post("/delSofData", (request, response) => {
    if (request.method === "OPTIONS") {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    connection.query("DELETE FROM softwarepool WHERE("
        + 'id="' + request.body.id + '")',
        function (err) {
            if (err)
                throw err;
            else {
                console.log("Link deleted");
            }
        });
    response.end();
});

module.exports = postRouter;