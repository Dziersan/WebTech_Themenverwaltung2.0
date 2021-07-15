const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;

const app = express();
app.use(express.static())