/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Dominik Dziersan & Sven Petersen & Louis Kottmann
 * @module This router is for processing GETs to html files and simple GETs
 */

const express = require('express');
const router = express.Router();
//const connection = require('../services/getDatabaseConnection.js');
const path = require("../config/pathConfig.json");
const connection = require('./getDatabaseConnection.js');


router.get("/RequirementsEditGer", (request, response) => {
    response.sendFile(path.path + "/view/html/mainPage.html");
});

router.get("/GanttHome", (request, response) => {
    response.sendFile(path.path + "/view/html/GanttHome.html");
});

router.get("/MilestonesSubpage1", (request, response) => {
    response.sendFile(path.path + "/view/html/MilestonesSubpage1.html");
});

router.get("/RequirementsEditGer", (request, response) => {
    response.sendFile(path.path + "/view/html/login.html");
});

router.get("/login", (request, response) => {
    response.sendFile(path.path + "/view/html/login.html");
});

router.get("/home", (request, response) => {
    response.sendFile(path.path + "/view/html/home.html");
});

router.get("/register", (request, response) => {
    response.sendFile(path.path + "/view/html/register.html");
});

router.get("/admin_G3", (request, response) => {
        response.sendFile(path.path + "/view/html/admin_G3.html");

});


router.get("/student_G3", (request, response) => {

        response.sendFile(path.path + "/view/html/student_G3.html");

});


router.get("/upload_G3", (request, response) => {
        response.sendFile(path.path + "/view/html/upload_G3.html");

});


/**
 *  This method provides a json object with all registerd users.
 */

router.get("/getUser", (request, response) => {

    let sql = "SELECT id, name, surname, e_mail, password, course, authorization, verified FROM USER;";

    connection.query(sql, (err, result,) => {
        if (err) {
            response.end();
        }
        response.contentType('application/json');
        response.json(result);
        return result;
    });

});

/**
 * This method allows the user and admin to change their personal data.
 */
 router.get("/updateUser", (request, response) => {

    let sql = "SELECT id, name, surname, e_mail, password, course, authorization FROM USER;";

    connection.query(sql, (err, result,) => {
        if (err) {
            response.end();
        }
        response.contentType('application/json');
        response.json(result);
        return result;
    });

});


/**
 *  This method provides a json object with one registerd users.
 */

router.get("/getOneUser", (request, response) => {

    var userId = request.session.userId;

    let sql = "SELECT name, surname, e_mail, password, semester,course FROM user where id = " + userId + ";";

    connection.query(sql, (err, result,) => {
        if (err) {
            response.end();
        }
        response.contentType('application/json');
        response.json(result);
        return result;
    });
});

/**
 * This get Method gives higher authorized users the HTML otherwise redirecting
 */
router.get("/token", (request, response) => {
    if (request.session.userAuthorization === "lecturer"
        || request.session.userAuthorization === "admin") {
        response.sendFile(path.path + '/view/html/token.html');
    } else {
        response.redirect("/login");
    }
});

/**
 * sends different HTMLS to specific authorized users
 */
router.get("/showUsers", (request, response) => {
    if (request.session.userAuthorization === "lecturer") {
        response.sendFile(path.path + '/view/html/lecturerView.html');
    } else if (request.session.userAuthorization === "admin") {
        response.sendFile(path.path + '/view/html/adminView.html');
    } else {
        response.redirect("/userInfo");
    }
});

router.get("/", (request, response) => {

    response.sendFile(path.path + '/view/html/index.html');

});

router.get("/agb", (request, response) => {
    response.sendFile(path.path + '/view/html/agb.html');
});

router.get("/successfullregistration", (request, response) => {
    response.sendFile(path.path + '/view/html/successRegister.html');
});

router.get("/changepassword", (request, response) => {
    response.sendFile(path.path + '/view/html/changePassword.html');
});

router.get("/newmilestone", (request, response) => {
    response.sendFile(path.path + '/view/html/MilestonesNewMilestone.html');
});

router.get("/confirmation", (request, response) => {

    response.sendFile(path.path + "/view/html/confirmEmail.html");
});

router.get("/passwordforgot", (request, response) => {

    response.sendFile(path.path + "/view/html/passwordForgot.html");

});


router.get("/impressum", (request, response) => {

    response.sendFile(path.path + "/view/html/impressum.html");

});

router.get("/userInfo", (request, response) => {

    response.sendFile(path.path + "/view/html/userView.html");

});

router.get("/admin", (request, response) => {
    if (request.session.userAuthorization === "admin") {
        response.sendFile(path.path + '/view/html/adminView.html');
    } else {
        response.redirect("/userInfo");
    }
});

router.get("/lecturerView", (request, response) => {

    response.sendFile(path.path + '/view/html/lecturerView.html');
});

router.get("/addUser", (request, response) => {

    response.sendFile(path.path + "/view/html/addUser.html");

});

router.get("/showUsers", (request, response) => {
    if (request.session.userAuthorization === "lecturer") {
        response.sendFile(path.path + '/view/html/lecturerView.html');
    } else if (request.session.userAuthorization === "admin") {
        response.sendFile(path.path + '/view/html/adminView.html');
    } else {
        response.redirect("/profil");
    }
});

router.post("/createTable", (request, response) => {

    if (request.method === "OPTIONS") {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    connection.query("CREATE TABLE IF NOT EXISTS " + request.body.tablename + "requirement "
        + "(ID VARCHAR(50), "
        + "Name VARCHAR(50), "
        + "Shortdesc LONGTEXT)",
        function (err) {
            if (err)
                throw err;
            else {
                console.log("Table created");
            }
        });
    response.end();
});

router.post("/saveReqData", (request, response) => {

    if (request.method === "OPTIONS") {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    connection.query("INSERT INTO requirements (id,name,short_desc,start_time,end_time) VALUES("
        + '"' + request.body.id + '",'
        + '"' + request.body.name + '",'
        + '"' + request.body.shortdesc + '",'
        + '"' + request.body.starttime + '",'
        + '"' + request.body.endtime + '")',
        function (err) {
            if (err)
                throw err;
            else {
                console.log("Requirement created");
            }
        });
    response.end();
});

router.post("/delReqData", (request, response) => {
    if (request.method === "OPTIONS") {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    connection.query("DELETE FROM requirements WHERE("
        + 'id="' + request.body.id + '")',
        function (err) {
            if (err)
                throw err;
            else {
                console.log("Requirement deleted");
            }
        });
    response.end();
});

router.post("/loadtable", (request, response) => {

    connection.query("SELECT * FROM requirements ", function (err, result, fields) {
        if (err)
            throw err;
        else {
            console.log(result);
        }
    })
});

router.get('/getSFTWPOOLData', (req, res) => {
    let sql = 'SELECT * FROM softwarepool';

    connection.query(sql, (err, result) => {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
    })
})


router.get('/getNotificationData', (req, res) => {
    let sql = 'SELECT * FROM notification';

    connection.query(sql, (err, result) => {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
    })
})



module.exports = router;