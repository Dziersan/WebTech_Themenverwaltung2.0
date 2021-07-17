fetch('/getStudentsIntoTable')
    .then (response => 
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("tableStudentGroup").innerHTML = text; 
    })


/* TODO: 

1. Versuchen den Gruppennamen über den Header zu übergeben

2. Gruppenname direkt über ein Template "Response.render" setzen..
Dann auf dieses Feld zugreifen, wenn der Tabelleninhalt geladen werden soll.

*/
