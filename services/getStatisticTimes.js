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

    var table = document.getElementById('statisticsTableBody')
    for (i = 0; i < data.length; i++) {

        var row = `<tr>
                            <td>T </td>
							<td>${data[i].surname + data[i].name}</td>
							<td>${data[i].sumTime}</td>
					  </tr>`
        table.innerHTML += row

    }

}//;


//function renderHTMLStatistics3(data) {
//   for (var i = 1; i < data.length; i++) {
//        var tr = document.createElement('tr');
//
//        var td1 = document.createElement('td');
//        td1.innerText = data[i].surname + data[i].name;
        //var td2 = document.createElement('td');
        //td2.innerText = data[i].sumTime;
//        document.getElementById("testStatistik");
//    }

    /* Beispiel in services/adminView.js Zeile 35 bis 66*/
//}