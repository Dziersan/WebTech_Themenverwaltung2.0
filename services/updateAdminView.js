const connection = require('./getDatabaseConnection.js');

connection.query(sql,
    function (err, result) {
        if (err)
            throw err;
    });