

function getMilestones() {

    fetch('/getMilestones')
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

        var node = document.createElement("li");
        var anchor = document.createElement("a");
        anchor.href = "MilestonesSubpage1.html";
        anchor.target = "_parent";
        anchor.innerText = data[i].description;
       // var textnode = document.createTextNode(data[i].description);
        node.appendChild(anchor);
        //  node.appendChild(textnode);
        document.getElementById("overwiewList").appendChild(node);

    }

    /* Beispiel in services/adminView.js Zeile 35 bis 66*/

}