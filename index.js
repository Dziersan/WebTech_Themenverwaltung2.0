/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Created, refactored by group 1
 * @class Node.js server
 */

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const router_G3 = express.Router();
configDatabase = require("./config/datenbankConfig.json");
const connection = require("./services/getDatabaseConnection.js");
const upload = require("./services/multerConfig");
const fileWorker = require('./services/file.controller.js');



global.__basedir = __dirname;
var lifeTime = 1000 * 60 * 60 * 24;// 24 hour
var lifeTimeLong = 1000 * 60 * 60 * 24 * 365 * 10;  //1 Year
var tokenLifeTime = 60 * 24 * 366;// 10 + 1 day year



var {
    PORT = 3000,
    sessionLifetime = lifeTime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;

/**
 * @method
 * Express static imports for folders which are accessable from public
 */
app.use('/css', express.static('./view/css'));
//app.use('/css',express.static('./css'));
app.use('/javascript', express.static('./services'));
app.use('/css', express.static('./test'));
app.use('/images', express.static('./images'));
app.use('/', express.static('./view/html'));
app.use('/javascript', express.static('./test'));
app.use('/javascript', express.static('./api'));
//app.use('/privat/images',express.static('./Gruppe_1_Registrierung/privat/images'));

app.use('/CSS', express.static('./Gruppe_5_Editor/Web Technologies/Projekt/CSS'));
app.use('/JS', express.static('./Gruppe_5_Editor/Web Technologies/Projekt/JS'));
app.use('/HTML', express.static('./Gruppe_5_Editor/Web Technologies/Projekt/HTML'));

//Limit sizes of json files of the server accepts
app.use(express.json({limit: "10kb"}));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('resources'));
require("./services/file.router")(app, router_G3, upload);

/**
 * @method
 * Configuration of the cookie
 */
app.use(session({
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    secret: secretSession,
    cookie: {
        maxAge: sessionLifetime,
        sameSite: true,
        secure: false    //in development in production :true
    }
}));

/**
 * AUTHOR: Dominik Dziersan
 * If the user didnt accept the cookie redirect him to the mainpage
 * @method redirectCookie
 * @param request
 * @param response
 * @param next
 */
const redirectCookie = (request, response, next) => {
    if (request.session.enabledCookies === false
        || request.session.enabledCookies === undefined) {
        request.session.enabledCookies = false;
        response.redirect("/");
    } else {
        next();
    }
};

/**
 * AUTHOR: Dominik Dziersan
 * If a user is not logged in, redirect him to the login
 * @method redirectLogin
 * @param request
 * @param response
 * @param next
 */
const redirectLogin = (request, response, next) => {

    if (!request.session.userId) {
        response.redirect("/login")
    } else {
        next();
    }
};
/**
 * AUTHOR: Dominik Dziersan
 * If a user is logged in, redirect him to home
 * @method redirect Home
 * @param request
 * @param response
 * @param next
 */
const redirectHome = (request, response, next) => {

    if (request.session.userId) {
        response.redirect("/home");
    } else {
        next()
    }
};

/**
 * AUTHOR: Dominik Dziersan
 * For specific reasons the double request bugs some methods. Use this to prevent it.
 * @method ignoreFavicon
 * @param request
 * @param response
 * @param next
 */
function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({nope: true});
    } else {
        next();
    }
};

/**
 * AUTHOR: Dominik Dziersan
 * Send all informations of a session to a user.
 * @method Send session every connection
 * @param request
 * @param response
 * @param next
 */
app.use((request, respond, next) => {
    const {userId} = request.session;

    respond.locals.enabledCookies = request.session.enabledCookies;


    if (userId) {
        respond.locals.userId = request.session.userId;
        respond.locals.userName = request.session.userName;
        respond.locals.userAuthorization = request.session.userAuthorization;
    }
    next();
});

/**
 * @method
 * GET Methods from routesGET.js
 */
router = require("./services/getRouters.js");
routerGrp2 = require("./Gruppe_2_Gruppendefinition/SoSe21/src/scripts/routingConfig.js");

app.get("/", router);
app.get("/login", redirectHome, redirectCookie, router);
app.get("/register", redirectHome, ignoreFavicon, redirectCookie, router);
app.get("/agb", redirectCookie, router);
app.get("/successfullregistration", redirectCookie, router);
app.get("/resetpassword", router);
app.get("/token", redirectLogin, router);
app.get("/home", redirectLogin, router);
app.get("/admin", redirectLogin, router);
app.get("/getUser", redirectLogin, router);
app.get("/confirmation", router);
app.get("/passwordforgot", router);
app.get("/register", router);
app.get("/changepassword", router);
app.get("/adminView", redirectLogin, router);
app.get("/impressum", router);
app.get("/userInfo", redirectLogin, router);
app.get("/presentation", router);
app.get("/admin", router);
app.get("/stud", router);
app.get("/RequirementsEditGer", redirectLogin, router);
app.get("/upload_G3",router);
app.get("/admin_G3", router);
app.get("/student_G3" ,router);
app.get("/MSGanttHome", redirectLogin, router);
app.get("/MilestonesSubpage1", redirectLogin, router);
app.get("/newmilestone", router);
app.get("/getMilestones", redirectLogin, router);
/*
router2 = require("./services/file.router")(app, router_G3, upload);
/!*app.get("/api/files/upload", router2);
app.get("/api/files/getall", router2);*!/
app.get('/upload_G3', router2);
app.get('/admin_G3', router2);
app.get('/student_G3', router2);
*/

//Get without HTML|| email
app.get("/cookie", (request, response) => {
    response.json(request.session);
});

//-------------------------------------------
//Hier muss noch die routesGet angepasst werden
//-------------------------------------------
app.get("/myGroups", router);
app.get("/joinGroup", router);
app.get("/requirementsdefinition", router);

app.get("/favicon.ico", (request, response) => {
    response.writeHead(204, {'Content-Type': 'image/x-icon'});
    response.end();
});



app.get("/loadtable", (request, response) => {
    console.log("Test Console Log2")
    connection.query("SELECT * FROM requirements ", function (err, result, data) {
        if (err)
            throw err;
        else {
            response.send(result);
        }
    });
});

app.post("/createTable", (request, response) => {

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
        });
    response.end();
});

app.post("/saveReqData", (request, response) => {

    if (request.method === "OPTIONS") {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    connection.query("INSERT INTO requirements (id,name,short_desc,start_time,end_time) VALUES("
        + '"' + request.body.id + '",'
        + '"' + request.body.name + '",'
        + '"' + request.body.shortdesc + '",'
        + '"' + request.body.startdate + '",'
        + '"' + request.body.enddate + '")',
        function (err) {
            if (err)
                throw err;
        });
    response.end();
});

app.post("/delReqData", (request, response) => {
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
        });
    console.log("Daten werden gelöscht")
    response.end();
});

app.post("/editReq", (request, response) => {

    if (request.method === "OPTIONS") {
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    connection.query("SELECT * FROM requirements  WHERE("
        + 'id="' + request.body.editID + '")',
        function (err) {
            if (err)
                throw err;
        });
    response.end();
});

app.post('/api/files/upload', upload.array("uploadfile"), fileWorker.uploadFile);



/**
 * @method
 * POST Methods
 */
routerConfirmation = require('./services/confirmMail.js');
app.use(routerConfirmation);

routerPassword = require('./services/sendMailToChangePassword.js');
app.use(routerPassword);

routerChangePassword = require('./services/changePassword.js');
app.use(routerChangePassword);

routerLogin = require('./api/routesLogin.js');
app.use(routerLogin);

routerMilestone = require('./services/routesMilestone.js');
app.use(routerMilestone);

routerRegister = require('./api/routesRegister.js');
app.use(routerRegister);

routerToken = require("./services/routesToken.js");
app.get("/getToken", routerToken);
app.use(routerToken);

insertRout = require('./services/postRouters.js');
app.use(insertRout);

/*//Gruppe 5 Editor
routerEdit = require("./services/routesGetPostEditor.js");*/

/*app.get("/requirements", redirectLogin, routerEdit);
app.use(routerEdit);*/

app.post("/enableCookie", (request, response) => {
    request.session.enabledCookies = true;

    response.end();
});

app.post("/logout", (request, respond) => {

    request.session.destroy(err => {
        if (err) {
            return respond.redirect("/home");
        }
        respond.clearCookie(sessionName);
        respond.redirect("/");
    })
});

// Post Methods
app.post("/index.html", redirectLogin, (request, response, next) => {
    if (request.session.userId) {
        response.redirect("/home");
    }
    next();
});

const server = app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));

module.exports = router;

router.post("/loadtable", (request, response) => {

    connection.query("SELECT * FROM requirements ", function (err, result, fields) {
        if (err)
            throw err;
    })
});

module.exports = {
    server: server,
    session: session,
    redirectLogin: redirectLogin,
    redirectHome: redirectHome,
    session: session
};

app.use('/style', express.static('./Gruppe_2_Gruppendefinition/SoSe21/src/style'));
app.use('/scripts', express.static('./Gruppe_2_Gruppendefinition/SoSe21/src/scripts'));
app.use('/Modul', express.static('./Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung'));
app.use('/Gruppe', express.static('./Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung'));

//Gruppe 2
//Gruppenansicht
app.post("/groupView/upload", routerGrp2);
app.get("/groupView/tableGroupMembers", routerGrp2);
app.get("/groupView/captionGroupName", routerGrp2);
app.get("/groupView/calenderAppointments", routerGrp2);
app.post("/groupView/calenderView/createAppointment", routerGrp2);
app.get("/groupView/memberEditView/tableAddableMembers", routerGrp2);
app.get("/groupView/memberEditView/tableRemovableMembers", routerGrp2);
app.post("/groupView/memberEditView/addMember", routerGrp2);
app.post("/groupView/memberEditView/removeMember", routerGrp2);
app.post("/groupView/upload", routerGrp2);
app.post("/groupView/leaveGroup", routerGrp2);

//Modulansicht
app.get("/moduleView/Header", routerGrp2);
app.get("/moduleView/moduleParticipants", routerGrp2);
app.get("/moduleView/moduleGroups", routerGrp2);
app.get("/moduleView/deleteParticipantsView/moduleParticipants", routerGrp2);
app.post("/moduleView/insertGroupsView/insertGroups",routerGrp2);
app.post("/moduleView/deleteGroupsView/deleteGroups",routerGrp2);
app.post("/moduleView/deleteParticipantsView/deleteParticipantFromModule",routerGrp2);
app.get("/moduleView/groupDistributionView/tableSelectUser", routerGrp2);
app.get("/moduleView/groupDistributionView/tableSelectGroups", routerGrp2);
app.post("/moduleView/groupDistributionView/autoRollGroups", routerGrp2);
app.post("/moduleView/addMemberView/userLookup", routerGrp2);
app.post("/moduleView/addMemberView/addMember", routerGrp2);
app.post("/moduleView/editGroupsView/aktiveGroup", routerGrp2);
app.post("/moduleView/editGroupsView/inaktiveGroup", routerGrp2);
app.post("/moduleView/editGroupsView/joinGroup", routerGrp2);
app.post("/moduleView/editGroupsView/joinStopGroup", routerGrp2);
app.get("/moduleView/createInviteCode", routerGrp2);
app.post("/moduleOverview/joinModuleViaCode", routerGrp2);
app.get("/moduleViewUser/moduleGroups", routerGrp2);
app.post("/moduleViewUser/joinGroup", routerGrp2);

//Übersicht Module
app.post("/moduleOverview/createModulView/insertModul", routerGrp2);
app.post("/moduleOverview/deleteModulView/deleteModul", routerGrp2);
app.get("/moduleOverview/myModules", routerGrp2);
app.get("/moduleOverview/createModulView/profList", routerGrp2);
app.get("/moduleOverview/deleteModulView/listEveryModul", routerGrp2);

//Übersicht Gruppen
app.get("/groupOverview/getMyGroupsIntoTable", routerGrp2);

//General
app.get("/groupView", routerGrp2);
app.get("/groupOverview", routerGrp2);
app.get("/moduleView", routerGrp2);
app.get("/moduleOverview", routerGrp2);

app.get("/home/dropdownModules", (request, response, next) =>
{
    let userID = request.session.userId;
    let query = `SELECT Modulname, modul.Modul_ID as Modul_ID FROM modul INNER JOIN user_modul ON modul.Modul_ID = user_modul.Modul_ID INNER JOIN user ON user_modul.User_ID = user.ID WHERE user.ID = '${userID}' LIMIT 5;`
    connection.query(query, function(err, result, fields)
    {
        if (err) response.send(Error);
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += '<a href="/moduleView?modulID=' + result[i].Modul_ID  + '">' + result[i].Modulname + '</a>';
            }
            response.send(resultString);
        }
        else response.send("Keine Module vorhanden.");
    });
});

app.get("/home/dropdownGroups", (request, response, next) =>
{
    let userID = request.session.userId;
    let query = `SELECT Gruppenname, groups.Group_ID as Group_ID FROM groups INNER JOIN user_group ON groups.Group_ID = user_group.Group_ID INNER JOIN user ON user_group.User_ID = user.ID WHERE user.ID = '${userID}' AND groups.active = 1 LIMIT 5;`
    connection.query(query, function(err, result, fields)
    {
        if (err) response.send(Error);
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += '<a href="/groupView?grpID=' + result[i].Group_ID + '">' + result[i].Gruppenname + '</a>';
            }
            response.send(resultString);
        }
        else response.send("Keine Gruppen vorhanden.");
    });
});