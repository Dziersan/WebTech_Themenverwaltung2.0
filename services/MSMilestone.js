/**
 * Version 1.0
 * 08.06.2021
 *
 *@author Kevin Bosse
 */

/**
 * @class Milestone with getSelected(recieving data from html elements functions)
 */

class Milestone {

    constructor(description, status, predecessor, /*successor,*/ start, end) {

        this.description = description;
        this.status = status;
        this.predecessor = predecessor;
       // this.successor = successor;
        this.start = start;
        this.end = end;
    }

    getSelectedMilestoneNew() {

        let description = document.getElementById("msDescription").value;
        let status = document.getElementById("msStatus").value;
        let predecessor = parseInt(document.getElementById("msPredecessorNew").value);
       // let successor = parseInt(document.getElementById("msSuccessor").value = "");
        let start = document.getElementById("msStart").value;
        let end = document.getElementById("msDeadline").value;

        return new Milestone(description, status, predecessor, /*successor ,*/ start, end)

    }

    getSelectedMilestoneEdit() {

        let description = document.getElementById("msDescriptionEdit").value;
        let status = document.getElementById("msStatusEdit").value;
        let predecessor = parseInt(document.getElementById("msPredecessorEdit").value);
      //  let successor = parseInt(document.getElementById("msSuccessorEdit").value);
        let start = document.getElementById("msStartEdit").value;
        let end = document.getElementById("msDeadlineEdit").value;

        return new Milestone(description, status, predecessor, /*successor ,*/ start, end)

    }
}

/**
 * @method
 * This function fetches client data to getMilestones ressource on server and
 * calls render function with recieved data
 * @param
 */

function getMilestones() {

    fetch('/getMilestones')
        .then(response => {

            return response.json();

        }).then(responseData => {
        rendergetMilestones(responseData)
        console.log(responseData)

    })
};



/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data
 */

function rendergetMilestones(data) {

    for (i = 0; i < data.length; i++) {


        var node = document.createElement("li");
        var anchor = document.createElement("a");
        anchor.setAttribute('class', 'testo');
        anchor.setAttribute('id', data[i].milestoneID);
        anchor.href = "MilestonesSubpage1.html";
        anchor.setAttribute('onclick', 'getMilestoneId(this.id);');
        anchor.target = "_parent";
        anchor.innerText = data[i].description;

        node.appendChild(anchor);

        document.getElementById("overviewList").appendChild(node);

    }

}

/**
 * @method
 * This function fetches client data to createMilestone ressource on server
 * @param
 */

function addMilestone() {

    let milestone = new Milestone().getSelectedMilestoneNew();

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(milestone)
    };

    fetch('/createMilestone', options)
        .then(response => response.json())

    location.reload();
}

/**
 * @method
 * This function fetches client data to editMilestone ressource on server
 * @param
 */

function editMilestone() {

    let milestone = new Milestone().getSelectedMilestoneEdit();

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(milestone)
    };

    fetch('/editMilestone', options)
        .then(response => response.json())

    location.reload();
}

/**
 * @method
 * This function fetches client data to deleteMilestone ressource on server
 * @param
 */

function deleteMilestone() {

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    };

    fetch('/deleteMilestone', options)
        .then(response => response.json())

    location.reload();
}

