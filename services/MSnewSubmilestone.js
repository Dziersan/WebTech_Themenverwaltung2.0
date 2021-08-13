/**
 * Version 1.0
 * 10.08.2021
 *
 *@author Kevin Bosse
 */


/**
 * @class Submilestone with getSelected function (for getting html element values)
 */

class Submilestone {

    constructor(description) {
        this.description = description;
    }

    getSelectedSubmilestone() {

        let description = document.getElementById("newToDo").value;

        return new Submilestone(description)

    }

}

/**
 * @method
 * This function fetches client data to createNewSubmilestone ressource on server
 * @param
 */

function addSubmilestone() {

    let submilestone = new Submilestone().getSelectedSubmilestone();

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(submilestone)
    };

    fetch('/createNewSubmilestone', options)
        .then(response => response.json())
}

