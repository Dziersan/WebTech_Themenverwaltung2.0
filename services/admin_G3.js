document.addEventListener('DOMContentLoaded', () => {
    getData()
    getNotification()
});

async function getData() {
    const response = await fetch('/getSFTWPOOLData');
    const data = await response.json();
    loadHTML(data);
}

async function getNotification() {
    const response = await fetch('/getNotificationData')
    const data = await response.json();

    loadNotification(data);
}

document.getElementById('btn').addEventListener('click', insertData);

async function insertData() {
    const name = document.getElementById('sftwname').value;
    const beschreibung = document.getElementById('sftwbeschreibung').value;
    const link = document.getElementById('sftwlink').value;
    let softwarepool = {
        software_name: name,
        software_description: beschreibung,
        software_link: link
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(softwarepool)
    };

    const response = await fetch('/insert', options);
    const data = await response.json();
}


function loadHTML(data) {
    const tbody = document.getElementById('data-table');
    let tbodyHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = "<tr><td class='no-dat' colspan='5'> No Data</td></tr>"
        return;
    }

    for (item of data) {
        tbodyHTML += "<tr>";
        tbodyHTML += `<td>${item.id}</td>`
        tbodyHTML += `<td>${item.software_name}</td>`;
        tbodyHTML += `<td>${item.software_description}</td>`;
        tbodyHTML += `<td>${item.software_link}</td>`;
        tbodyHTML += `<td><button class="delete-row-btn" data-id=${item.id}>Delete</td>`;
        tbodyHTML += "</tr>";
    }

    tbody.innerHTML = tbodyHTML;
}


function loadNotification(data) {
    const tbody = document.getElementById('notification-table');
    let tbodyHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = "<tr><td class='no-dat' colspan='5'> No Data</td></tr>"
        return;
    }

    for (item of data) {
        tbodyHTML += "<tr>";
        tbodyHTML += `<td>${item.id}</td>`
        tbodyHTML += `<td>${item.software_name}</td>`;
        tbodyHTML += `<td>${item.software_description}</td>`;
        tbodyHTML += `<td><button class="delete-row-btn" data-id=${item.id}>Erledigt</td>`;
        tbodyHTML += "</tr>";
    }

    tbody.innerHTML = tbodyHTML;
}

document.getElementById('data-table').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteRow(event.target.dataset.id);
    }
});

document.getElementById('notification-table').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteNoctificationRow(event.target.dataset.id);
    }
});

async function deleteNoctificationRow(id) {

    const deleteOption = {

        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        },
    };

    const response = await fetch('/deleteNotification/' + id, deleteOption);
    const data = await response.json();

    console.log(data);
}
