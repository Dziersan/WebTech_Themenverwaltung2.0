function getSubmilestones() {

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

    var table = document.createElement("table")
    table.setAttribute('width', "100%")
    table.setAttribute('id', 'submilestoneTable')
    document.getElementById("submilestoneList").appendChild(table);

    for (i = 0 ; i < data.length ; i++) {

        var node = document.createElement("tr");
        var anchor = document.createElement("td");

        anchor.innerText = data[i].description;

        var radioButton1 = document.createElement("td");
        radioButton1.setAttribute('align', 'center')
        var radioInput1 = document.createElement('input');
        radioInput1.setAttribute('type', 'radio');
        radioInput1.setAttribute('id', 'undone');
        radioInput1.setAttribute('name', 'progress' );
        radioInput1.setAttribute('value', '1');

        var radioButton2 = document.createElement("td");
        radioButton2.setAttribute('align', 'center')
        var radioInput2 = document.createElement('input');
        radioInput2.setAttribute('type', 'radio');
        radioInput2.setAttribute('id', 'work');
        radioInput1.setAttribute('name', 'progress');
        radioInput2.setAttribute('value', '2');

        var radioButton3 = document.createElement("td");
        radioButton3.setAttribute('align', 'center')
        var radioInput3 = document.createElement('input');
        radioInput3.setAttribute('type', 'radio');
        radioInput3.setAttribute('id', 'done');
        radioInput1.setAttribute('name', 'progress');
        radioInput3.setAttribute('value', '3');

        var deleteButton = document.createElement("td");
        deleteButton.setAttribute('align', 'center');
        deleteButton.setAttribute('width', '70px');
        var buttonAttributes = document.createElement('button');
        buttonAttributes.innerText = "Löschen";
        radioInput3.setAttribute('class', 'deleteInGridbtn');

        node.appendChild(anchor);

        node.appendChild(radioButton1);
        node.appendChild(radioInput1);

        node.appendChild(radioButton2);
        node.appendChild(radioInput2);

        node.appendChild(radioButton3);
        node.appendChild(radioInput3);

        node.appendChild(deleteButton);
        node.appendChild(buttonAttributes);

        document.getElementById("submilestoneTable").appendChild(node);

    }

    /* Beispiel in services/adminView.js Zeile 35 bis 66*/

}