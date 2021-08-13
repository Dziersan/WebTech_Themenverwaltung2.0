// contains DELETE queries
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const deleteRouter = express.Router();

deleteRouter.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    let sql = 'DELETE FROM softwarepool WHERE id = ?';

    connection.query(sql, id, (err, result) => {
        if (err) throw err;
    });

});

deleteRouter.delete('/deleteNotification/:id', (req, res) => {
    const {id} = req.params;
    let sql = 'DELETE FROM notification WHERE id = ?';

    connection.query(sql, id, (err, result) => {
        if (err) throw err;
    });

});

module.exports = deleteRouter;