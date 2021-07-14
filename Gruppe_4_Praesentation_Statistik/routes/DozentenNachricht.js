var app = require('../app');
var con = require('../mysql');

/*const express = require('express');
const Message = express.Router();*/

id=[];
groupID =[];
nachricht = [];
datum = [];
anfrageArt= [];

app.get('/Messsage',function (request,result) {
    result.render('DozentenNachricht.ejs');

});
con.query("Select * from messages",function (result,err)
{
    if (err) throw err;

    for (var i= 0; i<result.length;i++)
    {
        id[i] = result[i].message_id;
        nachricht[i] = result[i].message;
        datum[i] = result[i].date;
        anfrageArt[i] = result[i].type;
    }
});
app.listen(8080);