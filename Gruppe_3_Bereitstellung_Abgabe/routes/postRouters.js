// contains INSERT queries 
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const postRouter = express.Router();

// new entries for the softwarepool
postRouter.post('/insert', (req, res) => {
    let sql = 'INSERT INTO softwarepool(SOFTWARENAME, SOFTWARE_BESCHREIBUNG, SOFTWARELINK) VALUES (?,?,?)';

    connection.query(sql, [req.body.SoftwareName, req.body.Beschreibung, req.body.Link], (err, result) => {
        if (err) throw err;
    })
})

// saving entries for admin notification
postRouter.post('/insertNotification', (req, res) => {
    let sql = 'INSERT INTO notification(GROUP_NAME, BESCHREIBUNGS_TEXT) VALUES (?,?)';

    connection.query(sql, [req.body.SoftwareName, req.body.Anfrage], (err, result) => {
        if (err) throw err;
    })
})

module.exports = postRouter;