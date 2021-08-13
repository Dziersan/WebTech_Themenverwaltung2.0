const fs = require('fs');
const path = require("../../../../config/pathConfig.json");
const mysql = require('mysql');
const { Console } = require('console');
const config = JSON.parse(fs.readFileSync(path.path + "/config/datenbankConfig.json"));

/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Dominik Dziersan
 * @class Simple database connection
 */

/**
 * @method
 * Connects to Database with given credentials from datenbankConfig.json
 * ggf. muss der Pfad in der path.config geändert werden
 * Installation des SQL Database Treibers über "npm install mysql"
 * @returns {Connection}
 */
function getConnection()
{
   return  mysql.createConnection(
        {
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            multipleStatements: true
        }
    );
};

module.exports = getConnection();
