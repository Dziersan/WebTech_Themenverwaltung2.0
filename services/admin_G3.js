
document.addEventListener('DOMContentLoaded', () => {
    getNotification()
   getData()

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



async function insertData() {
    class Softwarepool {
        constructor(Software_Name, Software_Description,Software_Link ) {

            this.software_name= Software_Name;
            this.software_description= Software_Description;
            this.software_link= Software_Link;


        }
        toString() {
            return this.software_name= + " " + this.software_description + " " + this.software_link ;
        }
    }


    const name = document.getElementById('sftwname').value;
    const beschreibung = document.getElementById('sftwbeschreibung').value;
    const link = document.getElementById('sftwlink').value;

    softwarepools = new Softwarepool(
        name,
        beschreibung,
        link
    )

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(softwarepools)
    };

    const response = await fetch('/insertSoftware', options);
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
        tbodyHTML += `<td><button class="deleteRowBtn"  id="deleRow" location.href='${item.software_link} data-id=${item.id}>Delete </td>`;
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
        tbodyHTML += `<td>${item.group_name}</td>`;
        tbodyHTML += `<td>${item.description}</td>`;
        tbodyHTML += `<td><button class="deleteRowBtn" data-id=${item.id}>Erledigt</td>`;
        tbodyHTML += "</tr>";
    }

    tbody.innerHTML = tbodyHTML;
}

/*document.getElementById('data-table').addEventListener('click', function (event) {
    if (event.target.className === "deleteRowBtn") {
        deleteRow(event.target.dataset.id);
    }
});*/
/*var sel = event.target.categ;
var categId = sel.options[sel.selectedIndex].getAttribute('id')*/

/*var el = document.getElementById('deleRow');
if(el){
    console.log("Ja");
    el.addEventListener('click', deleteNoctificationRow());
}
document.getElementById("deleRow").addEventListener("click", deleteNoctificationRow());*/

//document.getElementById("deleRow").addEventListener("click", deleteNoctificationRow());

/*document.getElementById('notification-table').addEventListener('click', function (event) {
    if (event.target.className === "deleteRowBtn") {
        deleteNoctificationRow(event.target.dataset.id);
    }
});*/



async function deleteNoctificationRow(id) {
    console.log("TEst")
    var row = document.getElementById(id);
    row.parentNode.removeChild(row);
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(softwarepools)
    };


    fetch("/delReqData", options)
    };






