fetch('/getStudentsIntoTable')
    .then (response => 
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("tableStudentGroup").innerHTML = text; 
    })

