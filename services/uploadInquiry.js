
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

var anfrage_btn= document.getElementById('anfrage-btn')
if(anfrage_btn){
    anfrage_btn.addEventListener('click', insertAnfrage);
}

async function insertAnfrage() {


    class Notifications {
        constructor(Group_Name, Description, ) {

            this.groupname = Group_Name;
            this.description = Description;


        }
        toString() {
            return this.groupname + " " + this.description ;
        }
    }


    const name = document.getElementById('gruppen-name').value;
    const anfrageText = document.getElementById('anfrage').value;

    notification = new Notifications(
        name,
        anfrageText
    );

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(notification)
    };

    const response = await fetch('/insertNotification', options);
    const data = await response.json();
}

