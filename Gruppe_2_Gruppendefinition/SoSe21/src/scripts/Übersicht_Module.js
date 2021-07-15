/* ------------------- Ab hier beginnt der Finale Teil ------------------- */

function buttonFilteredModules()
{
    fetch('/filteredModules')
        .then (response =>
        {
            console.log(response);
            return response.text();
        }).then (text =>
    {
        document.getElementById("ModulList").innerHTML = text;
    })
}
function buttonAllModules()
{
    fetch('/getModulesIntoTable')
        .then (response =>
        {
            console.log(response);
            return response.text();
        }).then (text =>
    {
        document.getElementById("ModulList").innerHTML = text;
    })
}
buttonAllModules();
