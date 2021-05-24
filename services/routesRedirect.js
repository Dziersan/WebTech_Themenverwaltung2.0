/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Dominik Dziersan
 */

const express = require('express')
const router = express.Router()

const redirectLogin = (request, response, next) => {

    if (!request.session.userId) {
        response.redirect("/login")
    } else {
        next();
    }
};

const redirectHome = (request, response, next) => {

    if (request.session.userId) {
        response.redirect("/home");
    } else {
        next()
    }
};

module.exports = {
    redirectHome: redirectHome,
    redirectLogin: redirectLogin,
}