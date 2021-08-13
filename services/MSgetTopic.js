/**
 * Version 1.0
 * 08.06.2021
 *
 *@author Kevin Bosse
 */

/**
 * @method
 * This function fetches client data to getTopic ressource on server
 * @param
 */

function getTopic() {

    fetch('/getTopic')
        .then(response => {

            return response.json();

        }).then(responseData => {
        renderTopic(responseData)
       // console.log(responseData)
    })

}

/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data: recieved response data from fetch
 */

function renderTopic(data) {

    for (i = 0; i < data.length; i++) {

        var node = document.createElement("form");
        // node.setAttribute('action', '/GanttHome')

        var anchor = document.createElement('a');
        anchor.setAttribute('id', data[i].id);
        anchor.setAttribute('value', data[i].id);
        anchor.href = "MSGanttHome.html"
       // button.setAttribute('class','header_button');
        anchor.setAttribute('onclick', 'getTopicId(this.id);');

        anchor.innerText = data[i].description;

        node.appendChild(anchor);

        document.getElementById("topic").appendChild(node)
    }
}

/**
 * @method
 * This function fetches client data to setTopicId ressource on server
 * @param topicId: Id of specific html element
 */

function getTopicId(topicId) {

    const object = {'topicId2': topicId}

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(object)
    };

    fetch('/setTopicId', options)
        .then(response => response.json())
}





