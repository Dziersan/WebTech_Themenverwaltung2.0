fetch('/home/dropdownModules')
    .then (response => 
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("ModulesDropdown").innerHTML = text; 
    })

fetch('/home/dropdownGroups')
    .then (response => 
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("GroupsDropdown").innerHTML = text; 
    })