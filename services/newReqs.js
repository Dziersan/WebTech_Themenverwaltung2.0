function checkdouble() {


    let idprefield2 = document.getElementById("idpre").value;
    let idfield2 = document.getElementById("id").value;

    let insid = idprefield2 + idfield2;

    let mtable = document.getElementById("mbody");
    let stable = document.getElementById("sbody");
    let ntable = document.getElementById("nbody");


    let x = mtable.rows.length - 1;
    let y = stable.rows.length - 1;
    let z = ntable.rows.length - 1;
    let a = 0;
    let row;

    if (idprefield2 === "M") {

        for (let i = 0; mtable.rows[i]; i++) {
            row = mtable.rows[i];

            let row0 = row.querySelector("td:nth-child(1)").innerHTML;

            if (row0 == insid) {
                alert("ID " + insid + " existiert bereits!");
                a = 1;
                break;
            }

            if ((x === i) && (a === 0)) {
                checkInput();
                break;
            }
        }

    } else if (idprefield2 === "S") {

        for (let i = 0; stable.rows[i]; i++) {
            row = stable.rows[i];

            let row0 = row.querySelector("td:nth-child(1)").innerHTML;


            if (row0 == insid) {
                alert("ID " + insid + " existiert bereits!");
                a = 1;
                break;
            }

            if ((y === i) && (a === 0)) {
                checkInput();
                break;
            }
        }

    } else {

        for (let i = 0; ntable.rows[i]; i++) {
            row = ntable.rows[i];

            let row0 = row.querySelector("td:nth-child(1)").innerHTML;


            if (row0 == insid) {
                alert("ID " + insid + " existiert bereits!");
                a = 1;
                break;
            }

            if ((z === i) && (a === 0)) {
                checkInput();
                break;
            }
        }

    }
}

/**
 *
 * @returns {boolean}
 */
function checkInput() {
    let idfield = document.getElementById("id").value;
    let namefield = document.getElementById("name").value;
    let shortdescfield = document.getElementById("shortdesc").value;
    let idprefield = document.getElementById("idpre").value;
    let submitOK;

    submitOK = "true";

    if (idprefield.length === 0) {
        alert("Setzen Sie die Priorit??t! \n Priority is not given!")
        submitOK = "false";
    }

    if (isNaN(idfield)) {
        alert("Bitte geben Sie eine Nummer f??r die Anforderung ein! \n Please set a number for this requirement!")
        submitOK = "false";
    }

    if (idfield.length === 0) {
        alert("Das ID Feld muss ausgef??llt sein! \n The ID-field has to be filled!")
        submitOK = "false";
    }

    if (namefield.length > 20) {
        alert("Der Name der Anforderung ist zu lang! \n The requirements name is too long!")
        submitOK = "false";
    }

    if (namefield.length === 0) {
        alert("Das Namensfeld muss ausgef??llt werden. \n The Name-field has to be filled!")
        submitOK = "false";
    }

    if (shortdescfield.length > 255) {
        alert("Die Kurzbeschreibung ist zu lang! \n The short description is too long!")
        submitOK = "false";
    }

    if (shortdescfield.length === 0) {
        alert("Kurzbeschreibung nicht ausgef??llt! \n Short description is not filled!")
        submitOK = "false";
    }

    if (submitOK === "false") {
        return false;
    } else {
        if (idprefield === "M") {
            addRow('mbody');
        } else if (idprefield === "S") {
            addRow('sbody');
        } else {
            addRow('nbody')
        }
    }
}

/**
 *
 */
function clearfields() {
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("shortdesc").value = '';
}

/**
 *
 * @param tableID
 */
function addRow(tableID) {

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

    let check = document.getElementById("check");

    let idfield = document.getElementById("id").value;
    let namefield = document.getElementById("name").value;
    let shortdescfield = document.getElementById("shortdesc").value;
    let idprefield = document.getElementById("idpre").value;
    let startdatenew = document.getElementById("starttime").value;
    let enddatenew = document.getElementById("endtime").value;
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
        fetch("/delReqData", options);

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

    fetch("/saveReqData", options)
        .then(response => response.json())
        .then(data => {

            if (data.register === "") {

            } else {
                alert(data.register);
                location.reload();
            }
        });

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

/**
 *
 *
 */
function searchID() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchfield");
    filter = input.value.toUpperCase();
    table = document.getElementById("reqtable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/**
 *
 */
function searchName() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchfieldname");
    filter = input.value.toUpperCase();
    table = document.getElementById("reqtable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/**
 *
 */
function miniAll() {
    let table;
    let tr;
    let td;
    let i;
    let subs;
    let val;

    table = document.getElementById("reqtable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length - 1; i++) {
        td = tr[i + 1].getElementsByTagName("td");
        subs = td[0].innerHTML.substr(1);
        val = parseFloat(subs);

        if (Number.isInteger(val) === true) {

        } else {
            tr[i + 1].style.visibility = "collapse";
        }

    }
}

/**
 *
 */
function maxAll() {
    let table;
    let tr;
    let td;
    let i;
    let val;

    table = document.getElementById("reqtable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length - 1; i++) {
        td = tr[i + 1].getElementsByTagName("td");
        val = parseFloat(td[0].innerHTML);

        if (Number.isInteger(val) === true) {

        } else {
            tr[i + 1].style.visibility = "visible";
        }
    }
}

/**
 *
 */
function letsdel(){
    let letsdel = document.getElementById("newButtID");
    let row = letsdel.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

/**
 *
 */
function checkdoubleupdate() {

    let idprefield2 = document.getElementById("newidpre").value;
    let idfield2 = document.getElementById("editid").value;

    let insid = idprefield2 + idfield2;

    let mtable = document.getElementById("mbody");
    let stable = document.getElementById("sbody");
    let ntable = document.getElementById("nbody");


    let x = mtable.rows.length - 1;
    let y = stable.rows.length - 1;
    let z = ntable.rows.length - 1;
    let a = 0;
    let row;

    let letsnotdel = document.getElementById("newButtID");
    let row17 = letsnotdel.parentNode.parentNode;
    let dieserow = row17.querySelector("td:nth-child(1)").innerHTML;

    if (idprefield2 === "M") {

        for (let i = 0; mtable.rows[i]; i++) {
            row = mtable.rows[i];
            let row0 = row.querySelector("td:nth-child(1)").innerHTML;

            if(row0==dieserow){
                letsdel();
                addRowupdate('mbody');
                break;
            }

            if (row0 == insid) {
                alert("ID " + insid + " existiert bereits!");
                a = 1;
                break;
            }

            if ((x === i) && (a === 0)) {
                letsdel();
                addRowupdate('mbody');
                break;
            }
        }

    } else if (idprefield2 === "S") {

        for (let i = 0; stable.rows[i]; i++) {
            row = stable.rows[i];
            let row0 = row.querySelector("td:nth-child(1)").innerHTML;

            if(row0==dieserow){
                letsdel();
                addRowupdate('mbody');
                break;
            }

            if (row0 == insid) {
                alert("ID " + insid + " existiert bereits!");
                a = 1;
                break;
            }

            if ((y === i) && (a === 0)) {
                letsdel();

                addRowupdate('sbody');
                break;
            }
        }

    } else {

        for (let i = 0; ntable.rows[i]; i++) {
            row = ntable.rows[i];

            let row0 = row.querySelector("td:nth-child(1)").innerHTML;

            if(row0==dieserow){
                letsdel();
                addRowupdate('mbody');
                break;
            }

            if (row0 == insid) {
                alert("ID " + insid + " existiert bereits!");
                a = 1;
                break;
            }

            if ((z === i) && (a === 0)) {
                letsdel();

                addRowupdate('nbody');
                break;
            }
        }

    }
}

/**
 *
 * @param tableID
 */
function addRowupdate(tableID) {

    class Requirements {

        constructor(ID, Name, ShortDesc, Starttime, Endtime) {
            this.id = ID;
            this.name = Name;
            this.shortdesc = ShortDesc;
            this.starttime = Starttime;
            this.endtime = Endtime;
        }

        toString() {
            return this.id + " " + this.name + " " + this.shortdesc + " " + this.starttime + " " + this.endtime;
        }
    }

    let check = document.getElementById("check");

    let idfield = document.getElementById("editid").value;
    let newpreID = document.getElementById("newidpre").value;
    let namefield = document.getElementById("editname").value;
    let shortdescfield = document.getElementById("editshortdesc").value;
    let startdatenew = document.getElementById("editstarttime").value;
    let enddatenew = document.getElementById("editendtime").value;
    let id = (newpreID + idfield);

    if (newpreID === "M") {
        var tableDef = document.getElementById(tableID);
        var newRow = tableDef.insertRow(-1);
        newRow.className = "red1";
    }

    if (newpreID === "S") {
        var tableDef = document.getElementById(tableID);
        var newRow = tableDef.insertRow(-1);
        newRow.className = "yellow2";
    }

    if (newpreID === "N") {
        var tableDef = document.getElementById(tableID);
        var newRow = tableDef.insertRow(-1);
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

    let newText11 = document.createTextNode(newpreID);
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
    newrewButton.onclick = function openupAdd() {
        check.checked = true;

        this.id = "newButtID";

        let row = newrewButton.parentNode.parentNode;

        let col1 = row.children[0].innerHTML.trim().substring(1);
        let col2 = row.children[1].innerHTML;
        let col31 = row.children[2].children[0].value;
        let col32 = row.children[2].children[1].value;
        let col4 = row.children[3].textContent;

        document.getElementById("editid").value = col1;
        document.getElementById("editname").value = col2;
        document.getElementById("editstarttime").value = col31;
        document.getElementById("editendtime").value = col32;
        document.getElementById("editshortdesc").value = col4;
    };

    let newdelButton = document.createElement("button");
    newdelButton.className = "delbutton";
    newdelButton.innerHTML = "<i  style=\"background-color: inherit\" class='fa fa-trash'></i>";
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

    fetch("/saveReqData", options)
        .then(response => response.json())
        .then(data => {

            if (data.register === "") {

            } else {
                alert(data.register);
                location.reload();
            }
        });

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

/**
 *
 */
function update() {
    document.getElementById("check").checked = false;
    document.getElementById("editid").value;
    document.getElementById("editname").value;
    document.getElementById("editshortdesc").value;
    document.getElementById("editstarttime").value;
    document.getElementById("editendtime").value;

    checkdoubleupdate();
}

/**
 *
 */
function exitUpdate() {
    document.getElementById("check").checked = false;
}
