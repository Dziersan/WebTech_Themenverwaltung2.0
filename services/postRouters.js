// contains INSERT queries 
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const postRouter = express.Router();
const connection = require("../services/getDatabaseConnection.js");
// new entries for the softwarepool
postRouter.post('/insert', (req, res) => {
    let sql = 'INSERT INTO softwarepool(software_name, software_description, software_link) VALUES (?,?,?)';

    connection.query(sql, [req.body.SoftwareName, req.body.Beschreibung, req.body.Link], (err, result) => {
        if (err) throw err;
    })
})

// saving entries for admin notification
postRouter.post('/insertNotification', (req, res) => {
    let sql = 'INSERT INTO notification(group_name, description) VALUES (?,?)';

    connection.query(sql, [req.body.SoftwareName, req.body.Anfrage], (err, result) => {
        if (err) throw err;
    })
})

module.exports = postRouter;