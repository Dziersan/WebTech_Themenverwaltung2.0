/* ------------------- Ab hier beginnt der Finale Teil ------------------- */

// Gruppenansicht Tabelle füllen.
function getModulesIntoTable()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("ModulList").innerHTML = this.responseText;
        }
    }
    xhttp.open("GET", "http://127.0.0.1:1337/getModulesIntoTable", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}


function filteredModules()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
            if (this.readyState == 4 && this.status == 200)
            {
            document.getElementById("ModulList").innerHTML = this.responseText
        }
    }
    xhttp.open("GET", "http://127.0.0.1:1337/filteredModules", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

}

