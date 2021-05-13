// contains SELECT * queries
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const getRouter = express.Router();

getRouter.get('/getSFTWPOOLData', (req, res) => {
    let sql = 'SELECT * FROM softwarepool';

    connection.query(sql, (err, result) => {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
    })
})


getRouter.get('/getNotificationData', (req, res) => {
    let sql = 'SELECT * FROM notification';

    connection.query(sql, (err, result) => {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
    })
})

module.exports = getRouter;