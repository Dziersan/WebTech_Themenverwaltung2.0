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

/* Function - statistic-chart */

function getStatisticTimesChart() {

    fetch('/getStatisticTimes')
        .then(response => {

            return response.json();

        }).then(responseData => {
        renderHTMLStatisticsChart(responseData)
        console.log(responseData)
    })
}

/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data
 */

function renderHTMLStatisticsChart(data) {

    for (i = 0; i < data.length; i++) {

        var value = parseInt(i) + 1;

        var node = document.createElement("tr");
        node.setAttribute('style', "height: "+ data[i].sumTime + " %");

        var anchor5 = document.createElement("th");
        anchor5.setAttribute('scope', "row");
        anchor5.innerText = "T" + value;

        var anchor6 = document.createElement("td");
        var anchor7 = document.createElement("span");
        anchor7.innerText = data[i].sumTime + " Std.";

        node.appendChild(anchor5);
        node.appendChild(anchor6);
        node.appendChild(anchor7);

        document.getElementById("statisticsChartBody").appendChild(node);
    }

}