function getSubmilestones(id) {

    const object = {'mileStoneId': 13};
    console.log(id);
    console.log(object);
    console.log("hallo");

    var options = {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(object)

    };

    fetch('/getSubmilestones2', options)

        .then(response => {

            return response.json();

        }).then(responseData => {
        renderSubMilestones(responseData)
      //  console.log(responseData)
    })
};

/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data
 */

function renderSubMilestones(data) {

    var table = document.createElement("table")
    table.setAttribute('width', "100%")
    table.setAttribute('id', 'submilestoneTable')
    var pictures = document.createElement("tr")
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
        radioInput1.setAttribute('name', i);
        radioInput1.setAttribute('value', '1');

        var radioButton2 = document.createElement("td");
        radioButton2.setAttribute('align', 'center')
        var radioInput2 = document.createElement('input');
        radioInput2.setAttribute('type', 'radio');
        radioInput2.setAttribute('id', 'work');
        radioInput2.setAttribute('name',i);
        radioInput2.setAttribute('value', '2');

        var radioButton3 = document.createElement("td");
        radioButton3.setAttribute('align', 'center')
        var radioInput3 = document.createElement('input');
        radioInput3.setAttribute('type', 'radio');
        radioInput3.setAttribute('id', 'done');
        radioInput3.setAttribute('name', i);
        radioInput3.setAttribute('value', '3');

        var deleteButton = document.createElement("td");
        deleteButton.setAttribute('align', 'center');
        deleteButton.setAttribute('width', '70px');
        var buttonAttributes = document.createElement('button');
        buttonAttributes.innerText = "Löschen";
        buttonAttributes.setAttribute('class', 'deleteInGridbtn');
        buttonAttributes.setAttribute ('style', 'float: Right');

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

