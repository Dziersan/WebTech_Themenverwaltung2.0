document.addEventListener('DOMContentLoaded', () => {
    getDataStudent()
});

async function getDataStudent() {
    const response = await fetch('/getSFTWPOOLData');
    const data = await response.json();

    loadHTMLStudent(data);

}

function loadHTMLStudent(data) {
    const tbody = document.getElementById('student-table');
    let tbodyHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = "<tr><td class='no-dat' colspan='5'> No Data</td></tr>"
        return;
    }

    for (item of data) {
        tbodyHTML += "<tr>";
        tbodyHTML += `<td>${item.software_name}</td>`;
        tbodyHTML += `<td>${item.software_description}</td>`;
        tbodyHTML += `<td><button type=button onclick="location.href='${item.software_link}'" > Click me </button></td>`;
        tbodyHTML += "</tr>";
    }
    tbody.innerHTML = tbodyHTML;
}

document.getElementById('anfrage-btn').addEventListener('click', insertAnfrage);

async function insertAnfrage() {
    console.log("hey")
    const name = document.getElementById('gruppen-name').value;
    const anfrageText = document.getElementById('anfrage').value;
    let softwarepool = {
        software_name: name,
        software_description: anfrageText,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(softwarepool)
    };

    const response = await fetch('/insertNotification', options);
    const data = await response.json();
}