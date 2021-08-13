fetch('/moduleOverview/myModules')
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("ModulList").innerHTML = text;
    })

function loadProfList (){
    fetch('/moduleOverview/createModulView/profList')
        .then (response =>
        {
            console.log(response);
            return response.text();
        }).then (text =>
    {
        document.getElementById("Dozenten").innerHTML = text;
    })
}
loadProfList();

//New Modul
var newModulArea = document.getElementById("createModul");

var newModulBtn = document.getElementById("BtnNewModul");

var newModulSpan = document.getElementById("closeNewModul");

newModulBtn.onclick = function() {
    newModulArea.style.display = "block";
}

newModulSpan.onclick = function() {
    newModulArea.style.display = "none";
}

//Delete Modul
var deleteModulArea = document.getElementById("deleteModul");

var deleteModulBtn = document.getElementById("BtnDeleteModul");

var deleteModulSpan = document.getElementById("closeDeleteModul");

deleteModulBtn.onclick = function() {
    deleteModulArea.style.display = "block";
    fetch('/moduleOverview/deleteModulView/listEveryModul')
        .then (response =>
        {
            console.log(response);
            return response.text();
        }).then (text =>
    {
        document.getElementById("deleteList").innerHTML = text;
    });
}

deleteModulSpan.onclick = function() {
    deleteModulArea.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == deleteModulArea) {
        deleteModulArea.style.display = "none";
    }
    if (event.target == newModulArea) {
        newModulArea.style.display = "none";
    }
}

