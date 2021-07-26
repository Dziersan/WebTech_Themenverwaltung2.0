const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config();
const router = express.Router()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

const connection = require("../services/getDatabaseConnection")//("../getDatabaseConnection");


/*const lifeTime = 1000 * 60 * 60 * 24;// 24 hour
const lifeTimeLong = 1000 * 60 * 60 * 24 * 365 * 10;  //1 Year
const tokenLifeTime = 60 * 24 * 366;// 10 + 1 day year

const {
    PORT = 3000,
    sessionLifetime = lifeTime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;

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
connection.connect((err) =>{
    if(err) throw err
    console.log(connection.state);
})*/

app.get('/getSFTWPOOLData', (req, res) =>{
    let sql = 'SELECT * FROM softwarepool';

    connection.query(sql, (err, result) =>{
        if (err){
            res.end();
            return;
        }
        res.json(result);

    })
})


app.get('/getNotificationData', (req, res) =>{
    let sql = 'SELECT * FROM notification';

    connection.query(sql, (err, result) =>{
        if (err){
            res.end();
            return;
        }
        res.json(result);

    })
})

app.post('/insert', (req, res) =>{
    let sql = 'INSERT INTO softwarepool(software_name, software_description, software_link) VALUES (?,?,?)';

    connection.query(sql,[req.body.SoftwareName, req.body.Beschreibung, req.body.Link],(err, result) =>{
        if(err) throw err;
        console.log('great Succsess!');
    })
})

app.post('/insertNotification', (req, res) =>{
    let sql = 'INSERT INTO notification(GROUP_NAME, BESCHREIBUNGS_TEXT) VALUES (?,?)';

    connection.query(sql,[req.body.SoftwareName, req.body.Anfrage],(err, result) =>{
        if(err) throw err;
        console.log('great Succsess!');
    })
})

app.delete('/delete/:id', (req, res) =>{
    const { id } = req.params;
    let sql = 'DELETE FROM softwarepool WHERE ID = ?';

    connection.query(sql, id, (err, result) =>{
        if(err) throw err;
        console.log('Row with the ID of ' + id + ' deleted');
    });

});

app.delete('/deleteNotification/:id', (req, res) =>{
    const { id } = req.params;
    let sql = 'DELETE FROM notification WHERE ID = ?';

    connection.query(sql, id, (err, result) =>{
        if(err) throw err;
        console.log('Row with the ID of ' + id + ' deleted');
    });

});

module.exports = app;