function getParticipants() {

    fetch('/getParticipants')
        .then(response => {

            return response.json();

        }).then(responseData => {
        renderParticipans(responseData)
        console.log(responseData)
    })

}

/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data
 */

function renderParticipans(data) {

    for (i = 0; i < data.length; i++) {

        var node = document.createElement("tr");
        var anchor = document.createElement("td");

        anchor.innerText = data[i].surname + data[i].name;

        var deleteButton = document.createElement("td");
        deleteButton.setAttribute('align', 'center');
        deleteButton.setAttribute('width', '70px');
        var buttonAttributes = document.createElement('button');
        buttonAttributes.innerText = "Löschen";
        buttonAttributes.setAttribute('class', 'deleteInGridbtn');
        buttonAttributes.setAttribute ('style', 'float: Right');

        node.appendChild(anchor);

        node.appendChild(deleteButton);
        node.appendChild(buttonAttributes);


        document.getElementById("participantsTable").appendChild(node)
    }
}
