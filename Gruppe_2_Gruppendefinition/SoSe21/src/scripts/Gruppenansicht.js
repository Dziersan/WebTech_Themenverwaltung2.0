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
document.getElementById("title").innerHTML = grpName;  


/* TODO: 

Gruppe Gravelshipping++ übergibt das "++" nicht über window.location.search
--> Workaround: Man könnte bei der Erstellung der Gruppen Sonderzeichen verbieten.

Abklären, ob wir für die Adminview eine extra HTML Seite definieren oder die Elemente dynamisch eingeblendet werden sollen.
--> Adminview erstellen

Calender CSS fertigstellen

Termine abrufen und anzeigen lassen

*/
