function createTable(tablename) {

    class Table {
        constructor(Tablename) {
            this.tablename = Tablename;
        }

        toString() {
            return this.tablename;
        }
    }

    table = new Table(
        tablename
    );

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(table)
    };

    fetch("/createTable", options);
}

function loadTable() {
    let data;

    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        //body: JSON.stringify(requirements)
    };

    fetch('/loadtable', options)
        .then(response => {return response.json()})
        .then(data =>{  getLoadTable(data)
        })

    console.log("Test Console Log")

}


loadTable();

// Test ab hier

function getLoadTable(data) {

    var rowCounter = 0;
    for (i = 0; i < data.length; i++) {

        // loading("userListContent", rowCounter);

        if (data[i].id.charAt(0) === "M") {
            loading('mbody', data);
        } else if (data[i].id.charAt(0) === "S") {
            loading('sbody', data);
        } else {
            loading('nbody', data)

        }
    }
}

function loading(tableID, data) {

    class Requirements {

        constructor(ID, Name, ShortDesc, startdate, enddate) {
            this.id = ID;
            this.name = Name;
            this.shortdesc = ShortDesc;
            this.startdate = startdate;
            this.enddate = enddate;
        }

        toString() {
            return this.id + " " + this.name + " " + this.shortdesc + " " + this.startdate + " " + this.enddate;
        }
    }

    for (i = 0; i < data.length; i++) {

    let check = document.getElementById("check");

    let idfield = data[i].id.slice(1);
    let namefield = data[i].name;
    let shortdescfield = data[i].short_desc;
    let idprefield = data[i].id.charAt(0);
    let startdatenew = data[i].start_time.substring(0,10);
    let enddatenew = data[i].end_time.substring(0,10);
    let id = idprefield + idfield;


    if (idprefield === "M") {
        var tableRef = document.getElementById(tableID);
        var newRow = tableRef.insertRow(-1);
        newRow.className = "red1";
    }

    if (idprefield === "S") {
        var tableRef = document.getElementById(tableID);
        var newRow = tableRef.insertRow(-1);
        newRow.className = "yellow2";
    }

    if (idprefield === "N") {
        var tableRef = document.getElementById(tableID);
        var newRow = tableRef.insertRow(-1);
        newRow.className = "green3";
    }

    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
    let newCell4 = newRow.insertCell(3);
    let newCell5 = newRow.insertCell(4);
    newCell5.className = "newcell";
    let newCell6 = newRow.insertCell(5);
    newCell6.className = "newcell";

    let newText11 = document.createTextNode(idprefield);
    let newText1 = document.createTextNode(idfield);
    let newText2 = document.createTextNode(namefield);

    let startdate = document.createElement("input");
    startdate.setAttribute("type", "date")
    startdate.value = startdatenew;

    let enddate = document.createElement("input");
    enddate.setAttribute("type", "date")
    enddate.value = enddatenew;

    let newTextarea = document.createElement("textarea");
    newTextarea.className = "shortdesc";
    newTextarea.innerHTML = shortdescfield;
    newTextarea.readOnly = true;

    let newrewButton = document.createElement("button");
    newrewButton.className = "rewbutton";
    newrewButton.innerHTML = "<i  style=\"background-color: inherit\" class='fas fa-edit'></i>";
    newrewButton.id = "editbtn";
    newrewButton.onclick = function openupAdd() {
        check.checked = true;

        this.id = "newButtID";
        // fetch("/delReqData", options);

        let row = newrewButton.parentNode.parentNode;

        let col1 = row.children[0].innerHTML.trim().substring(1);
        let col2 = row.children[1].innerHTML;
        let col31 = row.children[2].children[0].value;
        let col32 = row.children[2].children[1].value;
        let col4 = row.children[3].textContent;

        document.getElementById("editid").value = col1;
        document.getElementById("editname").value = col2;
        document.getElementById("editshortdesc").value = col4;
        document.getElementById("editstarttime").value = col31;
        document.getElementById("editendtime").value = col32;

    };

    let newdelButton = document.createElement("button");
    newdelButton.className = "delbutton";
    newdelButton.innerHTML = "<i  style=\"background-color: inherit\" class='fa fa-trash'></i>";
    newdelButton.id = "delbtn";
    newdelButton.onclick = function deleteRow() {
        let row = newdelButton.parentNode.parentNode;
        row.parentNode.removeChild(row);

        fetch("/delReqData", options)
    };

    requirement = new Requirements(
        id,
        namefield,
        newTextarea.value,
        startdate.value,
        enddate.value
    );

        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requirement)
        };
/*
        fetch("/saveReqData", options)
            .then(response => response.json())
            .then(data => {

                if (data.register === "") {

                } else {
                    alert(data.register);
                    location.reload();
                }
            });
*/
    newCell1.appendChild(newText11);
    newCell1.appendChild(newText1);
    newCell2.appendChild(newText2);
    newCell3.appendChild(startdate);
    newCell3.appendChild(enddate);
    newCell4.appendChild(newTextarea);
    newCell5.appendChild(newrewButton);
    newCell6.appendChild(newdelButton);

    clearfields();
}
}