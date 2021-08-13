/**
 * Version 1.0
 * 08.06.2021
 *
 *@author Kevin Bosse
 */

/**
 * @method
 * This function fetches client data to getPredecessor ressource on server
 * @param
 */

function getPredecessorNew() {

    fetch('/getPredecessor')
        .then(response => {

            return response.json();
        }).then(responseData => {

            renderPredecessorNew(responseData);

    })
}

/**
 * @method
 * This function renders html elements with recieved data out of responseData
 * @param data: recieved response data
 */

function renderPredecessorNew(data) {

    var node2 = document.createElement('option');
    node2.setAttribute('value', '')

    document.getElementById('msPredecessorNew').appendChild(node2);

    node2.innerText = "kein Vorgänger";

    for (i= 0; i < data.length; i++) {

        var node = document.createElement('option');
        node.setAttribute('id', data[i].milestoneId);
        node.setAttribute('value', data[i].milestoneId);

        node.innerText = data[i].description;

        document.getElementById('msPredecessorNew').appendChild(node);

    }
}

/**
 * @method
 * This function fetches client data to getPredecessor ressource on server
 * @param
 */

function getPredecessorEdit() {

    fetch('/getPredecessor')
        .then(response => {

            return response.json();
        }).then(responseData => {

        renderPredecessorEdit(responseData);

    })
}

/**
 * @method
 * This function renders html elements with recieved data out of responseData
 * @param data: recieved response data
 */

function renderPredecessorEdit(data) {
    console.log(data)
    for (i= 0; i < data.length; i++) {

        var node = document.createElement("option");
        node.setAttribute('id', data[i].milestoneId);
        node.setAttribute('value', data[i].milestoneId);

        node.innerText = data[i].description;

        document.getElementById('msPredecessorEdit').appendChild(node);

    }
}

/**
 * @method
 * This function fetches client data to getMilestoneDefaultValues ressource on server
 * @param
 */

function setDefaultValues() {

    fetch('/getMilestoneDefaultValues')
        .then(response => {

        return response.json();

    }).then(responseData => {

        renderDefaultValues(responseData)

    })
}

/**
 * @method
 * This function renders html elements with recieved data out of responseData
 * and auto selects status
 * @param data: recieved response data
 */

function renderDefaultValues(data) {

    for (i = 0; i < data.length; i++) {

        var status = data[i].status;
        var select = document.getElementById('msStatusEdit');
        var opts = select.options;
        (document.getElementById('msDescriptionEdit')).value = data[i].description;

        for (var opt, j = 1; opt = opts[j]; j++) {

             if (opt.value == status) {

                 select.selectedIndex = j;
                 break;
             }
        }
    }
}