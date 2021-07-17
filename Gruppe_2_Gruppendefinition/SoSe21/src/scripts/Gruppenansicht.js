fetch('/getStudentsIntoTable' + window.location.search)
    .then (response => 
    {
        return response.text();
    }).then (text =>
    {
        document.getElementById("tableStudentGroup").innerHTML = text; 
    })

const urlParams = new URLSearchParams(window.location.search);
const grpName = urlParams.get('grp');
grpName.toString();
console.log(grpName);
document.getElementById("title").innerHTML = "test";  


/* TODO: 

1. Versuchen den Gruppennamen über den Header zu übergeben

2. Gruppenname direkt über ein Template "Response.render" setzen..
Dann auf dieses Feld zugreifen, wenn der Tabelleninhalt geladen werden soll.

*/
