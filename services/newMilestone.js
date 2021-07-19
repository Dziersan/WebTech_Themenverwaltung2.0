/**
 * Version 1.0
 * 08.06.2021
 *
 *
 */

class Milestone {

    constructor(topicID, description, status, predecessor, start, end) {
        this.topicID = topicID;
        this.description = description;
        this.status = status;
        this.predecessor = predecessor;
        this.start = start;
        this.end = end;
    }

    getSelectedMilestone() {
        let topicID = document.getElementById("mtid").value;
        let description = document.getElementById("mname").value;
        let status = document.getElementById("msid").value;
        let predecessor = parseInt(document.getElementById("mpre").value);
        let start = document.getElementById("mstart").value;
        let end = document.getElementById("mdeadline").value;

        return new Milestone(topicID, description, status, predecessor, start, end)

    }
}

function addMilestone() {

    let milestone = new Milestone().getSelectedMilestone();

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(milestone)
    };

    fetch('/createMilestone', options)
        .then(response => response.json())
}