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
const multer = require('multer');
const uuid = require('uuid').v4;
const connection = require('../WebTech_Themenverwaltung2.0/Gruppe_2_Gruppendefinition/SoSe21/src/scripts/databaseConnection.js');
const { ConsoleReporter } = require("jasmine");
configDatabase = require("./config/datenbankConfig.json");


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

app.use('/style', express.static('./Gruppe_2_Gruppendefinition/SoSe21/src/style'));
app.use('/scripts', express.static('./Gruppe_2_Gruppendefinition/SoSe21/src/scripts'));
app.use('/Modul', express.static('./Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung'));
app.use('/Gruppe', express.static('./Gruppe_2_Gruppendefinition/SoSe21/src/Modulgruppenverwaltung'));

//Limit sizes of json files of the server accepts
app.use(express.json({limit: "10kb"}));
app.use(bodyParser.urlencoded({
    extended: true
}))

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
router = require("./services/routesGET.js");
routerGrp2 = require("./Gruppe_2_Gruppendefinition/SoSe21/src/scripts/routingConfig.js")

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
//Get without HTML|| email
app.get("/cookie", (request, response) => {
    response.json(request.session);
});


//-------------------------------------------
//Hier muss noch die routesGet angepasst werden
//-------------------------------------------

app.get("/upload", routerGrp2);
app.get("/getStudentsIntoTable", routerGrp2);
app.get("/joinGroup", router);
app.get("/requirementsdefinition", router);

// Routes Gruppe 2
app.get("/Gruppe", routerGrp2);
app.get("/Modul", routerGrp2);
app.get("/myGroups", routerGrp2);
app.get("/modulverwaltung", routerGrp2);
app.get("/hausarbeitsthemen",routerGrp2);
app.get("/getModulesIntoTable", routerGrp2);
app.get("/filteredModules", routerGrp2);
app.get("/insertDozent", routerGrp2);
app.get("/newModule", routerGrp2);
app.get("/getMyGroupsIntoTable",routerGrp2);
app.post("/upload", routerGrp2);
app.get("/modulAnsicht", routerGrp2);
app.get("/editTeilnehmer", routerGrp2);
app.get("/modulAnsichtHeader", routerGrp2);
app.get("/modulAnsichtStudentsTable", routerGrp2);
app.get("/modulAnsichtGroupsTable", routerGrp2);
app.get("/modulAnsichtAddTeilnehmer", routerGrp2);

app.get("/favicon.ico", (request, response) => {
    response.writeHead(204, {'Content-Type': 'image/x-icon'});
    response.end();
});
/**
 * @method
 * POST Methods
 */
routerConfirmation = require('./services/confirmMail1.0.js');
app.use(routerConfirmation);

routerPassword = require('./services/sendMailToChangePassword.js');
app.use(routerPassword);

routerChangePassword = require('./services/changePassword1.0.js');
app.use(routerChangePassword);

routerLogin = require('./api/routesLogin.js');
app.use(routerLogin);

routerRegister = require('./api/routesRegister.js');
app.use(routerRegister);

routerToken = require("./services/routesToken.js");
app.get("/getToken", routerToken);
app.use(routerToken);

//Gruppe 5 Editor
routerEdit = require("./Gruppe_5_Editor/Web Technologies/Projekt/routes/routesGetPostEditor.js");

app.get("/requirements", redirectLogin, routerEdit);
app.use(routerEdit);

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

function fillMyModules (request, response, next)
{
    let userID = request.session.userId;
    let query = `SELECT Modulname FROM modul INNER JOIN user_modul ON modul.Modul_ID = user_modul.Modul_ID INNER JOIN user ON user_modul.User_ID = user.User_ID WHERE user.User_ID = '${userID}' ;`
    connection.query(query, function(err, result, fields)
    {
        if (err) response.send(Error);
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += '<a href="/Modul' /* + result[i].Modulname + */ + '">' + result[i].Modulname + '</a>';
            }
            response.send(resultString);
        } 
        else response.send("Keine Module vorhanden.");
    });
}

function fillMyGroups (request, response, next)
{
    let userID = request.session.userId;
    let query = `SELECT Gruppenname FROM groups INNER JOIN user_group ON groups.Group_ID = user_group.Group_ID INNER JOIN user ON user_group.User_ID = user.User_ID WHERE user.User_ID = '${userID}';`
    connection.query(query, function(err, result, fields)
    {
        if (err) response.send(Error);
        if (result != null)
        {
            var resultString = "";
            for (var i = 0; i < result.length; i++)
            {
                resultString += '<a href="/Gruppe'/* + result[i].Gruppenname + */ + '">' + result[i].Gruppenname + '</a>';
            }
            response.send(resultString);
        }
        else response.send("Keine Gruppen vorhanden.");
    });
}

app.get("/fillMyModules", fillMyModules);

app.get("/fillMyGroups", fillMyGroups);

const server = app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));

module.exports = {
    server: server,
    session: session,
    redirectLogin: redirectLogin,
    redirectHome: redirectHome,
    session: session
};