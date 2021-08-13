fetch('/cookie')
    .then(response => response.json())
    .then(data => {

        var greeting = "Willkommen zurück " + data.userName;

        document.getElementById("name").innerHTML = greeting;

    })
    .catch(error => console.error(error))

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