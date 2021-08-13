let con = require('./mysql');
const express = require('express');
const DozentN = express.Router();

DozentN.get('/DozentMessage', async function  (request, result) {


    let mD = await getDozentMessage();
    result.render("../view/ejs/dozentMessage.ejs", {
        messageD: mD
    });
});


async function getDozentMessage() {
    let mD = [];
    let result = await LoadDozentMessage();
    for (let i = 0; i< result.length;i++) {
        mD.push({
            message_id: result[i].message_id,
            group_id: result[i].group_id,
            message: result[i].message,
            date: result[i].date,
            type: result[i].type
        });
    }
    return mD;
}

LoadDozentMessage = () =>{
    return new Promise((resolve, reject)=>{
        con.query("SELECT * FROM messages",  (error, results)=>{
            if(error){
                return reject(error);
            }
            console.log(results)
            return resolve(results);
        });
    });
};


module.exports = DozentN;

