const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const uploadData = express.Router();

uploadData.use(cors());

uploadData.use(express.json());
uploadData.use(express.urlencoded({extended: true}));

uploadData.use(express.static('public'))

const connection = require("../services/getDatabaseConnection")

uploadData.get('/getSFTWPOOLData', (req, res) =>{
    let sql = 'SELECT * FROM softwarepool';

    connection.query(sql, (err, result) =>{
        if (err){
            res.end();
            return;
        }
        res.json(result);

    })
})


uploadData.get('/getNotificationData', (req, res) =>{
    let sql = 'SELECT * FROM notification';

    connection.query(sql, (err, result) =>{
        if (err){
            res.end();
            return;
        }
        res.json(result);

    })
})

uploadData.post('/insert', (req, res) =>{
    let sql = 'INSERT INTO softwarepool(software_name, software_description, software_link) VALUES (?,?,?)';

    connection.query(sql,[req.body.SoftwareName, req.body.Beschreibung, req.body.Link],(err, result) =>{
        if(err) throw err;
        console.log('great Succsess!');
    })
})

uploadData.post('/insertNotification', (req, res) =>{
    let sql = 'INSERT INTO notification(GROUP_NAME, description) VALUES (?,?)';

    connection.query(sql,[req.body.SoftwareName, req.body.Anfrage],(err, result) =>{
        if(err) throw err;
        console.log('great Succsess!');
    })
})

uploadData.delete('/delete/:id', (req, res) =>{
    const { id } = req.params;
    let sql = 'DELETE FROM softwarepool WHERE ID = ?';

    connection.query(sql, id, (err, result) =>{
        if(err) throw err;
        console.log('Row with the ID of ' + id + ' deleted');
    });

});

uploadData.delete('/deleteNotification/:id', (req, res) =>{
    const { id } = req.params;
    let sql = 'DELETE FROM notification WHERE ID = ?';

    connection.query(sql, id, (err, result) =>{
        if(err) throw err;
        console.log('Row with the ID of ' + id + ' deleted');
    });

});

