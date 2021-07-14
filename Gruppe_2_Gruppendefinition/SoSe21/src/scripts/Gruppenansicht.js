const getDatabaseConnection = require("../scripts/databaseConnection.js");
var mysql = require('mysql');

require("../../../../services/getDatabaseConnection");

function testAlert()
{
    alert("Das ist ein Test.");
}

let currentDate;

// OnClick Funktion, die das aktuelle Datum beim Klicken auf eine Zahl im Calender setzen soll.
function setCurrentDate()
{
    currentDate = this;
}

// Soll alle Termine zurückgeben, die am ausgewählten Datum eingetragen sind.
function getAppointments(date)
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            
        }
    }

    xhttp.open("GET", "http://127.0.0.1:1337", true);
    xhttp.send();
}

// Gruppenansicht Tabelle füllen.
function getStudentsIntoTable()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("tableStudentGroup").innerHTML = this.responseText;
        }
    }
    xhttp.open("GET", "http://127.0.0.1:1337/getStudentsIntoTable", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

