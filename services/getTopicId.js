function getTopicId(id) {

    const object = {'topicId2': id}

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(object)
    };

    console.log(options);

    fetch('/setTopicId', options)
        .then(response => response.json())
}