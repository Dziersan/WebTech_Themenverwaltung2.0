/** changePassword
 *  Version 1
 *  Modification date: 22.07.2020
 *  Author: Sven Petersen
 *  @class to change the password of a user stores it in the database.
 */

const express = require('express');
const {getTextForgotPassword, getMailOptions, sendMail} = require('../api/nodeMailer.js');
const {checkInputForSQLInject} = require('../test/sql_InjectionTester.js');
const connection = require('./getDatabaseConnection.js');
const redirect = require("./routesRedirect");
const router = express.Router();

/**
 * @method
 * This router updates the password of an user.
 */
router.post("/updatePassword", (request, response) => {

    let email = request.body.email;
    let tokenReset = request.body.token;
    let password = request.body.password;

    if (email === undefined || email === null ||
        tokenReset === null || tokenReset === undefined) {
        response.redirect("/login");

    } else if (checkToken(tokenReset) === false) {
        response.redirect("/login");
    } else {

        let sql = `UPDATE USER
                   SET password = '${password}'
                   WHERE e_mail = '${email}';`;

        connection.query(sql, function (err, result) {
            if (err) throw err;
        });
        response.redirect("/login");
    }
});

/**
 * @method
 * This method checks if a given token is valid or not otherwise it returns false
 */
function checkToken(token) {
    if (token === "" || token === null || token === undefined) {
        redirect("/login");
    } else {
        let sql = `SELECT e_mail, used
                   FROM PW_FORGOT_TOKEN
                   WHERE current_timestamp < end
                     AND current_timestamp
                       >
                   start AND token ='${token}';`;
        connection.query(sql, function (err, result) {
            if (err)
                throw err;

            if (result.length !== 0) {
                let email = result[0].e_mail;
                let used = result[0].used;

                if (used === 0) {
                    let changeUsed = `UPDATE PW_FORGOT_TOKEN
                                      SET used = 1
                                      WHERE e_mail = '${email}';`;

                    connection.query(changeUsed, function (err, result) {
                        if (err) throw err;

                        if (result.length !== 0) {
                            return true;
                        }
                    });
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
        return true;
    }
};

module.exports = {router, checkToken};