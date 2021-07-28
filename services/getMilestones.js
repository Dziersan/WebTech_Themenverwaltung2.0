

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

   /* function rendergetMilestones3(data) {

        for (i = 0 ; i < data.length ; i++) {

            var node = document.createElement('li');
            var anchor = document.createElement('a');
            anchor.setAttribute('id', data[i].milestoneID);
            anchor.setAttribute('value', data[i].milestoneID);
            anchor.target = "_parent";
            anchor.innerText = data[i].description;
            node.appendChild(anchor);
            document.getElementById("overwiewList").appendChild(node);

        }
    } */

function rendergetMilestones(data) {

    for (i = 0; i < data.length; i++) {

        var node = document.createElement("li");
        var anchor = document.createElement("a");
        anchor.setAttribute('id', data[i].mileStoneID);
        anchor.setAttribute('onclick', 'getSubmilestones(this.id);')
        anchor.href = "MilestonesSubpage1.html";
        anchor.target = "_parent";
        anchor.innerText = data[i].description;
        // var textnode = document.createTextNode(data[i].description);
        node.appendChild(anchor);
        //  node.appendChild(textnode);
        document.getElementById("overviewList").appendChild(node);

    }

}




    /* Beispiel in services/adminView.js Zeile 35 bis 66*/



//  anchor.setAttribute('value', data[i].milestoneID);
//   anchor.setAttribute('onclick', 'getSubmilestones(this.id);');
//  anchor.href = "MilestonesSubpage1.html";

/*function renderHTML(data) {

    for (i = 0 ; i < data.length ; i++) {


        var node = document.createElement("li");
        var form = document.createElement("form");
        form.setAttribute('action', '/MilestonesSubpage1')
        var button = document.createElement("button");
        button.setAttribute('id', data[i].milestoneID);
        button.setAttribute('value', data[i].milestoneID);
        button.setAttribute('type', 'button');
        form.target = "_parent";
        button.setAttribute('onclick', 'getSubmilestones(this.id);');

        //  anchor.href = "MilestonesSubpage1.html";
        // anchor.target = "_parent";

        button.innerText = data[i].description;

        node.appendChild(form);
        form.appendChild(button);

        document.getElementById("overwiewList").appendChild(node);

    } */