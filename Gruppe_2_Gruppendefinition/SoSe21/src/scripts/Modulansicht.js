//Funktionen ausführen beim Laden der Seite Modulansicht
window.onload = () => {
    gruppenAnsichtStudentsTable()
    gruppenAnsichtGroupsTable()
}

// Modulansicht Tabelle füllen.
function gruppenAnsichtStudentsTable()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("tableStudentModul").innerHTML = this.responseText;
        }
    }
    xhttp.open("GET", "http://127.0.0.1:1337/gruppenAnsichtStudentsTable", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function gruppenAnsichtGroupsTable()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("tableDataHausarbeit").innerHTML = this.responseText;
        }
    }
    xhttp.open("GET", "http://127.0.0.1:1337/gruppenAnsichtGroupsTable", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}