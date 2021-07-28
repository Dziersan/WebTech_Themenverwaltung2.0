function getTopic() {

    fetch('/getTopic')
        .then(response => {

            return response.json();

        }).then(responseData => {
        renderTopic(responseData)
        console.log(responseData)
    })

}

/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data
 */

function renderTopic(data) {

    for (i = 0; i < data.length; i++) {

        var node = document.createElement("form");
       // node.setAttribute('action', '/GanttHome')

        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('id', data[i].id);
        button.setAttribute('value', data[i].id);
        button.setAttribute('class','header_button');
        button.setAttribute('onclick', 'getTopicId(this.id);');

        button.innerText = data[i].description;

        node.appendChild(button);

        document.getElementById("topic").appendChild(node)
    }
}



function getTopicId(abc) {

    const test = {'topicId2': abc}

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(test)
    };

    console.log(options);

    fetch('/setTopicId', options)
        .then(response => response.json())
}





