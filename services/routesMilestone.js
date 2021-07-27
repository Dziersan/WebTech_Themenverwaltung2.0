/**
 * Version 1.0
 * 08.06.2021
 *
 * @module /milestones
 */


/**
 * Import of modules
 *
 * @type {Connection} database connector
 */


const express = require("express");
const router = express();

const con = require("./getDatabaseConnection");
const round = require("./MSround");

/**
 * route for getting all milestones out of database
 *
 * GET
 *
 * @param response - sending the result within a JSON file to client
 */

/* Milestone */

router.get('/getMilestones', (request, response) => {
    sql = "SELECT milestone_id AS milestoneID, description, status, successor," +
        "start, end, duration " +
        "FROM MILESTONES;";

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

/**
 * route for creating a new milestone
 *
 * POST
 *
 * @param request - send information from client within a JSON file
 * @param response - sending a message  within a JSON file to client
 */

router.post('/createMilestone', (request, response) => {

    console.log(request.body);

    sql = "INSERT INTO MILESTONES (topic_id, description, status, predecessor, start, end) " +
        "VALUES " +
        "('" + request.body.topicID + "', '" + request.body.description + "', '"
        + request.body.status + "', " + request.body.predecessor + ", '" + request.body.start +"', '"
        + request.body.end +"');";

    con.query(sql, (err, result) => {

        console.log(sql);
        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (createMilestoe)');
            response.end();
        }

        response.json({"Message": "Erfolg"});
        return result
    });
});

/* Time */

router.post('/createNewTime', (request, response) => {

    var hours = round(parseInt(request.body.usedTime) / 3600);

    if (hours == 0) {

        hours = 0.1;

    }

    /* var date = new Date(null);
    date.setSeconds(4250);
    var result = date.toISOString().substr(11, 8);
    console.log(result); */

    sql = "INSERT INTO timeaccount_history (timeaccount_id, used_time, used_time_to_iso) " +
        "VALUES " +
        "(1, '" + hours + "', SEC_TO_TIME(" + request.body.usedTime + "));";

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (createNewTime)');
        }

        response.json({"Message": "Erfolg"});
        return result
    });
});

router.post('/createNewTimeManually', (request, response) => {

    console.log(request.body);

    var seconds = (parseFloat(request.body.hours) * 3600) + (parseFloat(request.body.minutes) * 60);

    console.log(seconds);

    var hours = round(seconds / 3600);

    console.log(hours);

    if (hours == 0) {

        hours = 0.1;

    }

    sql = "INSERT INTO timeaccount_history (timeaccount_id, used_time, used_time_to_iso) " +
        "VALUES " +
        "(1, '" + hours + "', SEC_TO_TIME(" + seconds + "));";

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (createNewTime)');
        }

        response.json({"Message": "Erfolg"});
        return result
    });
});

router.get('/getTimeHistory', (request, response) => {

    console.log(request.body);

    sql = "SELECT DATE_FORMAT(timestamp, '%d.%m.%Y') AS date, timeaccount_history.timeaccount_id " +
          "AS timeaccountID, used_time_to_iso AS detailTime, used_time AS usedTimeInHours, " +
          "name, surname " +
          "FROM timeaccount_history " +
          "   JOIN timeaccount ON timeaccount_history.timeaccount_id = timeaccount.timeaccount_id " +
          "   JOIN user ON timeaccount.user_id = user.id " +
          "WHERE timeaccount.topic_id = 1 AND used_time_to_iso IS NOT NULL;";


    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (createNewTime)');
            return;
        }

        response.json(result);
    });
});

/* Submilestone */

router.post('/createNewSubmilestone', (request, response) => {

    console.log(request.body);

    sql = "INSERT INTO submilestones (milestone_id, description) " +
        "VALUES " +
        "(16, '" + request.body.description + "');";

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (createNewTime)');
        }

        response.json({"Message": "Erfolg"});
        return result
    });
});

router.get('/getSubmilestones', (request, response) => {
    sql = "SELECT submilestone_id AS submilestoneID, description, status " +
        "FROM SUBMILESTONES " +
        "WHERE milestone_id = 5;";

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

/* Statistics */

router.get('/getStatisticTimes', (request, response) => {
    sql = "SELECT name, surname, SUM(used_time) AS sumTime " +
        "FROM user " +
        "JOIN timeaccount ON user.id = timeaccount.user_id " +
        "JOIN timeaccount_history ON timeaccount.timeaccount_id = timeaccount_history.timeaccount_id " +
        "WHERE timeaccount.topic_id = 3 GROUP BY name, surname;"

    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (getAllMilestones');
            return;
        }

        response.json(result);
        console.log(result);
    });
});

module.exports = router;




