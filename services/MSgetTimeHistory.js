function getTime() {

    fetch('/getSubmilestones')
        .then(response => {

            return response.json();

        }).then(responseData => {
        renderHTML(responseData)
        console.log(responseData)
    })
};

/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data
 */

function renderHTML(data) {

    for (i = 0 ; i < data.length ; i++) {

        anchor.innerText = data[i].description;

        node.appendChild(anchor);

        document.getElementById("submilestoneList").appendChild(node);

    }

    /* Beispiel in services/adminView.js Zeile 35 bis 66*/

}