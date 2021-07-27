function getStatisticTimes() {

    fetch('/getStatisticTimes')
        .then(response => {

            return response.json();

        }).then(responseData => {
        renderHTMLStatistics(responseData)
        console.log(responseData)
    })
}

/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data
 */

function renderHTMLStatistics(data) {

    for (i = 0; i < data.length; i++) {

        var value = parseInt(i) + 1;

        var node = document.createElement("tr");

        var anchor = document.createElement("td");
        anchor.innerText = "T" + value;


        var anchor2 = document.createElement("td");

        anchor2.innerText = data[i].surname + " " + data[i].name;

        var anchor3 = document.createElement("td");

        anchor3.innerText = data[i].sumTime;

        node.appendChild(anchor);
        node.appendChild(anchor2);
        node.appendChild(anchor3);

        document.getElementById("statisticsTableBody").appendChild(node);

    }

}

/*function renderHTMLStatistics(data) {





    var table = document.getElementById('statisticsTableBody')
    for (i = 0; i < data.length; i++) {

        var row = `<tr>
                            <td>T </td>
							<td>${data[i].surname + data[i].name}</td>
							<td>${data[i].sumTime}</td>
					  </tr>`
        table.innerHTML += row

    } */




