/**
 * @class
 * class Participant
 *
 */

class Participant {

    constructor(userId) {

        this.userId = userId;

    }

    getSelectedUser() {

        let userId = document.getElementById('msParticipant').value;

        return new Participant(userId)

    }
}

/**
 * @method
 * This function fetches the addParticipant request to server ressource
 * @param
 */

function addParticipant() {

    let participant = new Participant().getSelectedUser();

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(participant)
    };

    fetch('/addParticipant', options)
        .then(response => response.json())

    location.reload();

}

/**
 * @method
 * This function fetches the getParticipants request to server ressource
 * @param
 */

function getParticipants() {

    fetch('/getParticipants')
        .then(response => {

            return response.json();

        }).then(responseData => {
        renderParticipants(responseData)
        console.log(responseData)
    })

}

/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data
 */

function renderParticipants(data) {

    for (i = 0; i < data.length; i++) {

        var node = document.createElement("tr");
        var anchor = document.createElement("td");

        anchor.innerText = data[i].surname + " " + data[i].name;

        var deleteButton = document.createElement("td");
        deleteButton.setAttribute('align', 'center');
        deleteButton.setAttribute('width', '70px');
        var buttonAttributes = document.createElement('button');
        buttonAttributes.setAttribute('id', data[i].participantId)
        buttonAttributes.setAttribute('onclick', 'removeParticipant(this.id)');
        buttonAttributes.innerText = "Löschen";
        buttonAttributes.setAttribute('class', 'deleteInGridbtn');
        buttonAttributes.setAttribute ('style', 'float: Right');

        node.appendChild(anchor);

        node.appendChild(deleteButton);
        node.appendChild(buttonAttributes);


        document.getElementById("participantsTable").appendChild(node)
    }
};

/**
 * @method
 * This function fetches the remove request to server ressource
 * @param
 */

function removeParticipant(participantDetailsId) {

    const object = {'participantId': participantDetailsId};

    var options = {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(object)
    };


    fetch('/removeParticipant', options)
        .then(response => response.json())

    location.reload();
};

/**
 * @method
 * This function fetches the getAll request to server ressource
 * @param
 */

function getAllParticipants() {

    fetch('/getAllParticipants')
        .then(response => {

            return response.json();
        }).then(responseData => {

        renderGetParticipantSelect(responseData);

    })
}

/**
 * @method
 * This function renders the needed elements and attaches data from fetch to it
 * @param data
 */

function renderGetParticipantSelect(data) {

    for (i= 0; i < data.length; i++) {

        var node = document.createElement('option');
        node.setAttribute('id', data[i].userId);
        node.setAttribute('value', data[i].userId);

        node.innerText = data[i].surname + " " + data[i].name;

        document.getElementById('msParticipant').appendChild(node);

    }
}

