fetch('/modulAnsichtHeader')
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
{
    document.getElementById("modulAnsichtHeader").innerHTML = text;
})

fetch('/modulAnsichtStudentsTable')
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
{
    document.getElementById("tableStudentModul").innerHTML = text;
})

fetch('/modulAnsichtGroupsTable')
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
{
    document.getElementById("tableDataHausarbeit").innerHTML = text;
})

fetch('/modulAnsichtAddTeilnehmer')
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
{
    document.getElementById("searchtable").innerHTML = text;
})

if (document.getElementById("editTeilnehmer") != null) {
    document.getElementById("editTeilnehmer").addEventListener("click", editTeilnehmer);
}

function addTeilnehmer()
{
    let button = document.getElementById("BtnStaraptoah")
}