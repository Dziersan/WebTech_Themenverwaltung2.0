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

/**
 * route for getting all milestones out of database
 *
 * GET
 *
 * @param response - sending the result within a JSON file to client
 */

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
            console.log('Verbindung zur Datenbank fehlgeschlagen (getAllMilestones');
            response.end();
        }

        response.json({"Message": "Erfolg"});
        return result
    });
});

module.exports = router;




