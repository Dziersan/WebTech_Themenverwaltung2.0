fetch('/fillMyModules')
    .then (response => 
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("ModulesDropdown").innerHTML = text; 
    })

fetch('/fillMyGroups')
    .then (response => 
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("GroupsDropdown").innerHTML = text; 
    })