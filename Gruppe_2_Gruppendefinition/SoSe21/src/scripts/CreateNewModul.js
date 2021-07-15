function loadInsertDozent (){
    fetch('/insertDozent')
        .then (response =>
        {
            console.log(response);
            return response.text();
        }).then (text =>
    {
        document.getElementById("Dozenten").innerHTML = text;
    })
}
loadInsertDozent();