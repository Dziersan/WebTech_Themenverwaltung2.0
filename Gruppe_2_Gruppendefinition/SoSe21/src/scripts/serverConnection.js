/**
 * Node.js Server connection details. Will be called in routingConfig.js. TBD. if placed correctly.
 */

const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 1337;

app.listen(port, err => {
  if (err) 
  {
    return console.log("ERROR", err);
  }
  console.log("Listening on port " + port);
});

function getApp()
{
  return app;
}

module.exports = getApp();
