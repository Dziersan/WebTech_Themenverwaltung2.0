/**
 * Version 1.0
 * 08.06.2021
 *
 *@author Kevin Bosse
 */

/**
 * @method
 * This function fetches client data to getTimeHistory ressource on server
 * @param
 */

function getTime() {

    fetch('/getTimeHistory')
        .then(response => {

            return response.json();

        }).then(responseData => {
        renderHTMLTimeHistory(responseData)
        console.log(responseData)
    })
};

/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data: recieved response data from fetch
 */

function renderHTMLTimeHistory(data) {

    for (i = 0; i < data.length; i++) {

        var node = document.createElement("tr");

        var anchor = document.createElement("td");
        anchor.innerText = data[i].date;

        var anchor2 = document.createElement("td");
        anchor2.innerText = data[i].detailTime;

        var anchor3 = document.createElement("td");
        anchor3.innerText = data[i].name + " " + data[i].surname;

        node.appendChild(anchor);
        node.appendChild(anchor2);
        node.appendChild(anchor3);

        document.getElementById("timeTable").appendChild(node);

    }

}