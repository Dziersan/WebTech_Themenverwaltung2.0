//const express = require("express");
//const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const mysql = require('mysql');
const cors = require('cors');
/*const {response} = require("express");*/
/*const PORT = process.env.PORT || 5000;*/
/*const app = express();*/
//const connection = require("C:\Users\Julia\IdeaProjects\WebTech_Themenverwaltung2.0\services\getDatabaseConnection.js");
/*configDatabase = require("../config/datenbankConfig.json");
const connection = require("../services/getDatabaseConnection.js");*/
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*var express = require('express');
var app = express();*/
var router = express.Router();
var upload = require('./app/config/multerConfig.js');

global.__basedir = __dirname;

app.use(express.static('resources'));

require('./app/routers/file.router.js')(app, router, upload);

app.use(express.static('public'));

/*var lifeTime = 1000 * 60 * 60 * 24;// 24 hour
var lifeTimeLong = 1000 * 60 * 60 * 24 * 365 * 10;  //1 Year
var tokenLifeTime = 60 * 24 * 366;// 10 + 1 day year*/

/*var {
    PORT = process.env.PORT || 5000,
    sessionLifetime = lifeTime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;*/

/*const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});*/

connection.connect((err) => {
    if (err) throw err
    console.log(connection.state);
})

app.get('/getSFTWPOOLData', (req, res) => {
    let sql = 'SELECT * FROM softwarepool';

    connection.query(sql, (err, result) => {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
    })
})



app.get('/getNotificationData', (req, res) => {
    let sql = 'SELECT * FROM notification';

    connection.query(sql, (err, result) => {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
    })
})

app.post('/insert', (req, res) => {
    let sql = 'INSERT INTO softwarepool(software_name, software_description, software_link) VALUES (?,?,?)';

    connection.query(sql, [req.body.SoftwareName, req.body.Beschreibung, req.body.Link], (err, result) => {
        if (err) throw err;
    })
})

app.post('/insertNotification', (req, res) => {
    let sql = 'INSERT INTO notification(group_name, description) VALUES (?,?)';

    connection.query(sql, [req.body.SoftwareName, req.body.Anfrage], (err, result) => {
        if (err) throw err;
    })
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    let sql = 'DELETE FROM softwarepool WHERE ID = ?';

    connection.query(sql, id, (err, result) => {
        if (err) throw err;
    });

});

app.delete('/deleteNotification/:id', (req, res) => {
    const {id} = req.params;
    let sql = 'DELETE FROM notification WHERE ID = ?';

    connection.query(sql, id, (err, result) => {
        if (err) throw err;
    });

});

const server = app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));
router = require("./routes/getRouters.js");
app.get("/login", router);

/*module.exports = {
    server: server,
    session: session,
    redirectLogin: redirectLogin,
    redirectHome: redirectHome,
    session: session
};
app.listen(PORT, (err) => {
    if (err) throw err;
});*/
