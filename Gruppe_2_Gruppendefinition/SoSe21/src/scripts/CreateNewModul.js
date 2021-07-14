function insertDozent()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("Dozenten").innerHTML = this.responseText
        }
    }
    xhttp.open("GET", "http://127.0.0.1:1337/insertDozent", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}