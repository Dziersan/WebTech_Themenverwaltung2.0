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

    var userId = request.session.userId;

    sql = "SELECT milestone_id AS milestoneID, description, status, successor," +
        "start, end, duration " +
        "FROM MILESTONES " +
        "WHERE topic_id = (SELECT topic_id FROM topic_status WHERE user_id = " + userId + ");";

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

    var userId = request.session.userId;

    sql = "INSERT INTO MILESTONES (topic_id, description, status, predecessor, start, end) " +
        "VALUES " +
        "((SELECT topic_id FROM topic_status WHERE user_id = " + userId +"), '" + request.body.description + "', '"
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
     var userID = request.session.userId;

    sql= "INSERT INTO timeaccount_history (timeaccount_id, used_time, used_time_to_iso) " +
        "VALUES " +
        "((SELECT timeaccount_id FROM timeaccount WHERE user_id = " + userID + " AND topic_id = " + topic +"), " +
        "'" + hours + "', SEC_TO_TIME(" + request.body.usedTime + "));";

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

    var userID = request.session.userId;

    sql = "SELECT DATE_FORMAT(timestamp, '%d.%m.%Y') AS date, timeaccount_history.timeaccount_id " +
          "AS timeaccountID, used_time_to_iso AS detailTime, used_time AS usedTimeInHours, " +
          "name, surname " +
          "FROM timeaccount_history " +
          "   JOIN timeaccount ON timeaccount_history.timeaccount_id = timeaccount.timeaccount_id " +
          "   JOIN user ON timeaccount.user_id = user.id " +
          "WHERE timeaccount.topic_id = (SELECT topic_id FROM topic_status WHERE user_id = " + userID + ") AND used_time_to_iso IS NOT NULL;";


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

    console.log("route submilestones");
    sql = "SELECT submilestone_id AS submilestoneID, description, status " +
        "FROM SUBMILESTONES " +
        "WHERE milestone_id = " + request.body.mileStoneId +";";

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

router.post('/getSubmilestones2', (request, response) => {

    console.log("route submilestones");
    sql = "SELECT submilestone_id AS submilestoneID, description, status " +
        "FROM SUBMILESTONES " +
        "WHERE milestone_id = " + request.body.mileStoneId +";";

    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (getAllMilestones');
            return;
        }

        console.log(result);

        console.log(request.body.mileStoneId);
        console.log(request.body);

        response.json(result);
        return (result);
    });
});

/* Statistics */

router.get('/getStatisticTimes', (request, response) => {

    var userID = request.session.userId;

    sql = "SELECT name, surname, SUM(used_time) AS sumTime " +
        "FROM user " +
        "JOIN timeaccount ON user.id = timeaccount.user_id " +
        "JOIN timeaccount_history ON timeaccount.timeaccount_id = timeaccount_history.timeaccount_id " +
        "WHERE timeaccount.topic_id = (SELECT topic_id FROM topic_status WHERE user_id = " + userID + ") GROUP BY name, surname;";

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

router.get('/getTopic', (request, response) => {
    sql = "SELECT id, project_description AS description " +
        "FROM topic; ";


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

router.post('/setTopicId', (request, response) => {

    var userID = request.session.userId;

    sql= "UPDATE topic_status " +
        "SET " +
        "topic_id = " + request.body.topicId2 + " " +
        "WHERE user_id = " + userID +";";

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (createNewTime)');
        }

        response.json({"Message": "Erfolg"});
        return result
    });

    console.log(request.body.topicId2);
    console.log(request.body);

    request.session["topicID"] = request.body.topicId2;

    console.log(request.session.topicID);

});

router.get('/getParticipants', (request, response) => {

    var userID = request.session.userId;

    sql = "SELECT surname, name " +
        "FROM user " +
        "JOIN participant_group ON user.id = participant_group.user_id " +
        "WHERE participant_group.topic_id = (SELECT topic_id FROM topic_status " +
        "WHERE user_id = " + userID + ");";

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




