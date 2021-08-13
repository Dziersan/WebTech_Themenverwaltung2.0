/**
 * Version 1.0
 * 08.06.2021
 *
 *@author Kai Kühl, Leon Lelle, Jonas Littmeyer
 */

//TimeEdit Btn and Modal
// Get the modal
var editTimeModal = document.getElementById("editTimeModal");

// Get the button that opens the modal
var btn = document.getElementById("editTimeBtn");


// Get the <span> element that closes the modal
var span = document.getElementById("editTimeClose");

// When the user clicks the button, open the modal
btn.onclick = function() {
    editTimeModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    editTimeModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == editTimeModal) {
        editTimeModal.style.display = "none";
    }
}

// New Time Btn and Modal
var newTimeModal = document.getElementById("newTimeModal");
var newTimeBtn = document.getElementById("newTimeBtn");
var newTimeSpan = document.getElementById("newTimeClose");
newTimeBtn.onclick = function() {
    newTimeModal.style.display = "block";
}
newTimeSpan.onclick = function() {
    newTimeModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == newTimeModal) {
        newTimeModal.style.display = "none";
    }
}

//Edit Milestone Button
var editMilestoneModal = document.getElementById("editMilestoneModal");
var editMilestoneBtn = document.getElementById("editMilestoneBtn");
var editMilestoneSpan = document.getElementById("editMilestoneClose");
editMilestoneBtn.onclick = function() {
    editMilestoneModal.style.display = "block";
}
editMilestoneSpan.onclick = function() {
    editMilestoneModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == editMilestoneModal) {
        editMilestoneModal.style.display = "none";
    }
}

//New Member Btn and Modal
var newMemberModal = document.getElementById("newMemberModal");
var newMemberBtn = document.getElementById("newMemberBtn");
var newMemberSpan = document.getElementById("newMemberClose");
newMemberBtn.onclick = function() {
    newMemberModal.style.display = "block";
}
newMemberSpan.onclick = function() {
    newMemberModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == newMemberModal) {
        newMemberModal.style.display = "none";
    }
}

//New Member Btn and Modal
var newToDoModal = document.getElementById("newToDoModal");
var newToDoBtn = document.getElementById("newToDoBtn");
var newToDoSpan = document.getElementById("newToDoClose");
newToDoBtn.onclick = function() {
    newToDoModal.style.display = "block";
}
newToDoSpan.onclick = function() {
    newToDoModal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == newToDoModal) {
        newToDoModal.style.display = "none";
    }
}



highlight_row();
function highlight_row() {
    var table = document.getElementById('timeTable');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.onclick = function () {
            var rowId = this.parentNode.rowIndex;

            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].style.color = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "#5fa7fd";
            rowSelected.style.color = "#fff"
            rowSelected.className += " selected";
        }
    }
}


//STOPWATCH
var stopwatch = {
    etime : null, // HTML - Stoppuhr-Display
    erst : null, // HTML - Save-Button
    ego : null, // HTML - Start/Stop-Button
    init : function () {
        //HTML-Elemente importieren
        stopwatch.etime = document.getElementById("stopwatch-time");
        stopwatch.erst = document.getElementById("stopwatch-save");
        stopwatch.ego = document.getElementById("stopwatch-go");

        //Anklickbare Buttons
        stopwatch.erst.addEventListener("click", stopwatch.save);
        stopwatch.erst.disabled = false;
        stopwatch.ego.addEventListener("click", stopwatch.start);
        stopwatch.ego.disabled = false;
    },

    timer : null,
    now : 0,
    tick : function () {
        stopwatch.now++;
        var remain = stopwatch.now;
        var hours = Math.floor(remain / 3600);
        remain -= hours * 3600;
        var mins = Math.floor(remain / 60);
        remain -= mins * 60;
        var secs = remain;
        //Updatet angezeigte Stoppuhr-Zeit
        if (hours<10) { hours = "0" + hours; }
        if (mins<10) { mins = "0" + mins; }
        if (secs<10) { secs = "0" + secs; }
        stopwatch.etime.innerHTML = hours + ":" + mins + ":" + secs;

        document.getElementById("stopwatch-time").setAttribute('value', stopwatch.now)
    },

    start : function () {
        stopwatch.timer = setInterval(stopwatch.tick, 1000);
        stopwatch.ego.value = "Stop";
        stopwatch.ego.removeEventListener("click", stopwatch.start);
        stopwatch.ego.addEventListener("click", stopwatch.stop);
        stopwatch.ego.style.backgroundColor = "#a32208";
    },

    stop  : function () {
        clearInterval(stopwatch.timer);
        stopwatch.timer = null;
        stopwatch.ego.value = "Start";
        stopwatch.ego.removeEventListener("click", stopwatch.stop);
        stopwatch.ego.addEventListener("click", stopwatch.start);
        stopwatch.ego.style.backgroundColor = "#20a308";
    },

    save : function () {
        if (stopwatch.timer != null) { stopwatch.stop(); }
        stopwatch.now = -1;
        stopwatch.tick();
    }
};
window.addEventListener("load", stopwatch.init);
