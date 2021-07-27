class Submilestone {

    constructor(description) {
        this.description = description;
    }

    getSelectedSubmilestone() {

        let description = document.getElementById("newToDo").value;

        return new Submilestone(description)

    }

}

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

