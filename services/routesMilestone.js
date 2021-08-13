/**
 * Version 1.0
 * 08.06.2021
 *
 * @module /milestones
 * @author Kevin Bosse
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
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

/* Milestone */

router.get('/getMilestones', (request, response) => {

    var userID = request.session.userId;

    sql1 = "SELECT(EXISTS(SELECT * FROM timeaccount WHERE user_id = " + userID +
        " AND topic_id = (SELECT topic_id FROM topic_status " +
        "WHERE user_id = " + userID + ")));";

    sql2 = "INSERT INTO timeaccount (user_id, topic_id) VALUES " +
        "(" + userID + ", (SELECT topic_id FROM topic_status WHERE " +
        "user_id = " + userID + "));";

    sql3 = "SELECT milestone_id AS milestoneID, description, status, successor," +
        "start, end, duration " +
        "FROM MILESTONES " +
        "WHERE topic_id = (SELECT topic_id FROM topic_status WHERE user_id = " + userID + ");";

    con.query(sql1, (err, result) => {

        if (err) {
            console.log(err);
            console.log("Verbindung zur Datenbank fehlgeschlagen (/getMilestones #1")

        } else if (Object.values(result[0])[0] == 0) {

            con.query(sql2, (err, result) => {

                if (err) {
                    console.log(err);
                    console.log("Verbindung zu Datenbank fehlgeschlagen (/getMilestones #2")
                }

                console.log("Timeaccount erfolgreich angelegt")
            })

        } else {

            console.log("There is already a specific timeaccount in existence");

        }
    })

    con.query(sql3, (err, result) => {
        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (getMilestones #3');
            return;
        }

        response.json(result);
    });
});

/**
 * route for getting default values for html elements
 *
 * GET
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.get('/getMilestoneDefaultValues', (request, response) => {

    console.log("Hallo bin hier")

    var userID = request.session.userId;

    sql = "SELECT description, status FROM milestones WHERE milestone_id = " +
        "(SELECT milestone_id FROM get_milestone_id WHERE user_id = " + userID + "); "

    con.query(sql, (err, result) => {
        console.log(result);
        if (err) {

            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"})
            console.log("Verbindung zur Datenbank fehlgeschlagen (/getMilestoneDefaultValues)")

        }

        response.json(result);
        console.log(result);
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

    var userID = request.session.userId;

    sql = "INSERT INTO MILESTONES (topic_id, description, status, predecessor, start, end) " +
        "VALUES " +
        "((SELECT topic_id FROM topic_status WHERE user_id = " + userID +"), '" + request.body.description + "', '"
        + request.body.status + "', " + request.body.predecessor + ", '" + request.body.start +"', '" + request.body.end +"');";

    con.query(sql, (err, result) => {

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

/**
 * route for editing specific milestone in database
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.post('/editMilestone', (request, response) => {

    var userID = request.session.userId;

    sql = "UPDATE milestones SET description = '" + request.body.description + "', " +
        "status = " + request.body.status +  ", predecessor = " + request.body.predecessor + ", " +
        "successor = " + request.body.successor + ", start = '" + request.body.start + "', " +
        "end = '" + request.body.end + "' " +
        "WHERE milestone_id = (SELECT milestone_id FROM get_milestone_id WHERE user_id = " + userID + ");";

    con.query(sql, (err, result) => {

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

/**
 * route for delete a milestone out of database
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.post('/deleteMilestone', (request, response) => {

    var userID = request.session.userId;

    sql1 = "DELETE FROM milestones WHERE milestone_id = (SELECT milestone_id FROM " +
        "get_milestone_id WHERE user_id = " + userID + ");";

    sql2 = "DELETE FROM submilestones WHERE milestone_id = (SELECT milestone_id FROM " +
        "get_milestone_id WHERE user_id = " + userID + ");";


    con.query(sql2, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (createMilestoe)');
            response.end();
        }

        con.query(sql1, (err, result) => {

            if (err) {
                console.log(err);
                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                console.log('Verbindung zur Datenbank fehlgeschlagen (createMilestoe)');
                response.end();
            }

            response.json({"Message": "Erfolgreich gelöscht"});
            return result
        });
    });

});

/**
 * route for getting milestones as viable predecessors for a dropdown menu
 *
 * GET
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.get('/getPredecessor', (request, response) => {

    var userID = request.session.userId;

    sql = "SELECT milestone_id AS milestoneId, description FROM milestones " +
        "WHERE topic_id = " +
        "(SELECT topic_id FROM topic_status WHERE user_id = " + userID + ");";

    con.query(sql, (err, result) => {

        if (err) {

            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehgeschlagen"})
            console.log("Verbindung zur Datenbank fehlgeschlagen (/getPredecessor)")

        }

        response.json(result)

    });
});

/**
 * route for creating time in database with stopwatch
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

/* Time */

router.post('/createNewTime', (request, response) => {

    var hours = round(parseInt(request.body.usedTime) / 3600);

    if (hours == 0) {

        hours = 0.1;

    }
     var userID = request.session.userId;

    sql= "INSERT INTO timeaccount_history (timeaccount_id, used_time, used_time_to_iso) " +
        "VALUES " +
        "((SELECT timeaccount_id FROM timeaccount WHERE user_id = " + userID + " AND topic_id = (SELECT topic_id FROM topic_status WHERE user_id = " + userID + ")), " +
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

/**
 * route for creating manually time in database
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.post('/createNewTimeManually', (request, response) => {

    var userID = request.session.userId;

    var seconds = (parseFloat(request.body.hours) * 3600) + (parseFloat(request.body.minutes) * 60);

    var hours = round(seconds / 3600);

    if (hours == 0) {

        hours = 0.1;

    }

    sql = "INSERT INTO timeaccount_history (timeaccount_id, used_time, used_time_to_iso) " +
        "VALUES " +
        "((SELECT timeaccount_id FROM timeaccount WHERE user_id = " + userID + " " +
        "AND topic_id = (SELECT topic_id FROM topic_status WHERE " +
        "user_id = " + userID + ")), '" + hours + "', " +
        "SEC_TO_TIME(" + seconds + "));";

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

/**
 * route for getting the time history out of database
 *
 * GET
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.get('/getTimeHistory', (request, response) => {

    var userID = request.session.userId;

    sql = "SELECT DATE_FORMAT(timestamp, '%d.%m.%Y') AS date, timeaccount_history.timeaccount_id " +
          "AS timeaccountID, used_time_to_iso AS detailTime, used_time AS usedTimeInHours, " +
          "name, surname " +
          "FROM timeaccount_history " +
          "   JOIN timeaccount ON timeaccount_history.timeaccount_id = timeaccount.timeaccount_id " +
          "   JOIN user ON timeaccount.user_id = user.id " +
          "WHERE timeaccount.topic_id = (SELECT topic_id FROM topic_status WHERE " +
          "user_id = " + userID + ") AND used_time_to_iso IS NOT NULL ORDER BY timestamp DESC;";


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

/**
 * route for creating new submilestone in database
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

/* Submilestone */

router.post('/createNewSubmilestone', (request, response) => {

    var userID = request.session.userId;

    sql = "INSERT INTO submilestones (milestone_id, description) " +
        "VALUES " +
        "((SELECT milestone_id FROM get_milestone_id WHERE user_id = " + userID + ")," +
        " '" + request.body.description + "');";

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

/**
 * route for getting specific submilestones
 *
 * GET
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.get('/getSubmilestones', (request, response) => {

    var userID = request.session.userId;


    sql = "SELECT submilestone_id AS submilestoneId, milestone_id AS milestoneID, description, status " +
        "FROM SUBMILESTONES " +
        "WHERE milestone_id = (SELECT milestone_id FROM get_milestone_id WHERE user_id = " + userID + ");";

    console.log("route submilestones");
   /* sql = "SELECT submilestone_id AS submilestoneID, description, status " +
        "FROM SUBMILESTONES " +
        "WHERE milestone_id = " + request.body.milestoneId +";"; */

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (getAllMilestones');
            return;
        }

        response.json(result);
        return (result);
    });
});

/**
 * route for delete a submilestone
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.post('/deleteSubmilestone', (request, response) => {

    var userID = request.session.userId;


    sql = "DELETE FROM submilestones where submilestone_id = " + request.body.submilestoneId + ";";

    console.log("route deleteMilestones");

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (getAllMilestones');
            return;
        }

        response.json(result);
        return (result);
    });
});

/**
 * route for getting times out of database wich is needed for statistics
 *
 * GET
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

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
    });
});

/**
 * route for getting the topics out of database
 *
 * GET
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

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
    });
});

/**
 * route for setting topic_id in database
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.post('/setTopicId', (request, response) => {

    var userID = request.session.userId;

    sql1= "SELECT (EXISTS(SELECT * FROM topic_status WHERE user_id = " + userID + "));";

    sql2= "INSERT INTO topic_status (user_id) VALUES (" + userID +");";

    sql3= "UPDATE topic_status " +
        "SET " +
        "topic_id = " + request.body.topicId2 + " " +
        "WHERE user_id = " + userID +";";

    con.query(sql1, (err, result) => {

        if (err) {

            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (/setTopicId #1');

        }   else if (Object.values(result[0])[0] == 0) {

                    con.query(sql2, (err, result) => {

                        if (err) {

                            console.log(err);
                            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                            console.log('Verbindung zur Datenbank fehlgeschlagen (/setTopicId #2');

                        }   else con.query(sql3, (err, result) => {

                                if (err) {

                                    console.log(err);
                                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                                    console.log('Verbindung zur Datenbank fehlgeschlagen (/setTopicId #3');

                                }

                                    response.json({"Message": "Erfolg"});
                                    return result;

                            })
                    })

            }   else con.query(sql3, (err, result) => {

                    if (err) {

                        console.log(err);
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Verbindung zur Datenbank fehlgeschlagen (/setTopicId #3.2');

                    }

                        response.json({"Message": "Erfolg"});
                        return result;

                })
    })

});

/**
 * route for getting specific participants group out of database
 *
 * GET
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.get('/getParticipants', (request, response) => {

    var userID = request.session.userId;

    sql = "SELECT surname, name, participant_group.participant_group_details_id AS participantId " +
        "FROM user " +
        "JOIN participant_group ON user.id = participant_group.user_id " +
        "WHERE participant_group.topic_id = (SELECT topic_id FROM topic_status " +
        "WHERE user_id = " + userID + ") AND milestone_id = " +
        "(SELECT milestone_id FROM get_milestone_id " +
        "WHERE user_id = " + userID + ");";

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
 * route for getting all Participants out of database
 *
 * GET
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.get('/getAllParticipants', (request, response) => {

    var userID = request.session.userId;

    sql = "SELECT surname, name, id AS userId " +
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
    });
});

/**
 * route for getting all milestones out of database
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.post('/addParticipant', (request, response) => {

    var userID = request.session.userId;


    sql = "INSERT INTO participant_group (user_id, topic_id, milestone_id) " +
        "VALUES ("+ request.body.userId + ", " +
        "(SELECT topic_id FROM topic_status WHERE user_id = " + userID +"), " +
        "(SELECT milestone_id FROM get_milestone_id WHERE " +
        "user_id = " + userID + "));";

    console.log("route deleteMilestones");

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (removeParticipant');
            return;
        }

        response.json(result);
        return (result);
    });
});

/**
 * route for getting all milestones out of database
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending the result within a JSON file to client
 */

router.post('/removeParticipant', (request, response) => {

    var userID = request.session.userId;


    sql = "DELETE FROM participant_group WHERE participant_group_details_id = " + request.body.participantId + ";";

    console.log("route deleteMilestones");

    con.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (removeParticipant');
            return;
        }

        response.json(result);
        return (result);
    });
});

/**
 * route for setting the milestone_id in database
 *
 * POST
 *
 * @param request - getting the needed data from client
 * @param response - sending result or Message to Client within a JSON FILE
 */

router.post('/setMilestoneId', (request, response) => {

    var userID = request.session.userId;

    sql1= "SELECT (EXISTS(SELECT * FROM get_milestone_id WHERE user_id = " + userID + "));";

    sql2= "INSERT INTO get_milestone_id (user_id, description) VALUES (" + userID + ");";

    sql3= "UPDATE get_milestone_id " +
        "SET " +
        "milestone_id = " + request.body.milestoneId + ", " +
        "description = (SELECT description FROM milestones WHERE milestone_id = " + request.body.milestoneId +") " +
        "WHERE user_id = " + userID +";";

    con.query(sql1, (err, result) => {

        if (err) {

            console.log(err);
            response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
            console.log('Verbindung zur Datenbank fehlgeschlagen (/setTopicId #1');

        }   else if (Object.values(result[0])[0] == 0) {

            con.query(sql2, (err, result) => {

                if (err) {

                    console.log(err);
                    response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                    console.log('Verbindung zur Datenbank fehlgeschlagen (/setTopicId #2');

                }   else con.query(sql3, (err, result) => {

                    if (err) {

                        console.log(err);
                        response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                        console.log('Verbindung zur Datenbank fehlgeschlagen (/setTopicId #3');

                    }

                    response.json({"Message": "Erfolg"});
                    return result;

                })
            })

        }   else con.query(sql3, (err, result) => {

            if (err) {

                console.log(err);
                response.json({"Message": "Verbindung zur Datenbank fehlgeschlagen"});
                console.log('Verbindung zur Datenbank fehlgeschlagen (/setTopicId #3.2');

            }

            response.json({"Message": "Erfolg"});
            return result;

        })
    })

});

module.exports = router;




