/**
 * Version 1.0
 * 26.07.2021
 *
 * @module /statistics
 */


/**
 * Import of modules
 *
 * @type {Connection} database connector
 */

const express = require("express");
const router = express();

const con = require("./getDatabaseConnection");

/**
 * route for getting all names and relevant times out of database
 *
 * GET
 *
 * @param response - sending the result within a JSON file to client
 */

router.get('/getStatisticTimes', (request, response) => {
    sql = "SELECT name, surname, SUM(used_time) AS sumTime" +
        "FROM user" +
        "JOIN timeaccount ON user.id = timeaccount.user_id" +
        "JOIN timeaccount_history ON timeaccount.timeaccount_id = timeaccount_history.timeaccount_id" +
        "WHERE timeaccount.topic_id = 3 GROUP BY name, surname;"

    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (getAllMilestones');
            return;
        }

        response.json(result);
    });
});







