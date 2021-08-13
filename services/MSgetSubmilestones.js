/**
 * Version 1.0
 * 11.08.2021
 *
 *@author Kevin Bosse
 */

function getSubmilestones() {

    fetch('/getSubmilestones')

        .then(response => {

            return response.json();

        }).then(responseData => {

              renderSubMilestones(responseData);

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
    var pictures1 = document.createElement("th")
    var pictures2 = document.createElement("th")
    pictures2.innerText = "&#10006";
    var pictures3 = document.createElement("th")
    pictures3.innerText = "&#9998";
    var pictures4 = document.createElement("th")
    pictures4.innerText = "&#10004";

    pictures.appendChild(pictures1)
    pictures.appendChild(pictures2)
    pictures.appendChild(pictures3)
    pictures.appendChild(pictures4)

    document.getElementById("submilestoneList").appendChild(table);

    for (i = 0; i < data.length; i++) {

        var node = document.createElement("tr");
        node.setAttribute('id', data[i].submilestoneId);
        var anchor = document.createElement("td");
        anchor.setAttribute('id', data[i].submilestoneId);

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
        radioInput2.setAttribute('name', i);
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
        buttonAttributes.setAttribute('id', data[i].submilestoneId);
        buttonAttributes.setAttribute('style', 'float: Right');
        buttonAttributes.setAttribute('onclick', 'deleteSubmilestone(this.id)');

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

}

/**
 * @method
 * This function fetches client data to getMilestoneId ressource on server
 * @param milestoneId: ID of html element
 */

    function getMilestoneId(milestoneId) {

        console.log('Hallo');

        console.log(milestoneId);

        const object = {'milestoneId': milestoneId};
        console.log(object);

        var options = {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(object)

        };

        console.log(options.body)

        fetch('/setMilestoneId', options)
            .then(response => response.json())
    }

/**
 * @method
 * This function fetches client data to deleteSubmilestone ressource on server
 * @param submilestoneId: ID of html element
 */

    function deleteSubmilestone(submilestoneId) {


        const object = {'submilestoneId': submilestoneId};

        var options = {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(object)

        };

        fetch('/deleteSubmilestone', options)
            .then(response => response.json())

        location.reload();
    }




