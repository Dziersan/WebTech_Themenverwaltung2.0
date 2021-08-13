fetch('/groupView/tableGroupMembers' + window.location.search)
    .then (response => 
    {
        console.log(window.location.search);
        return response.text();
    }).then (text =>
    {
        document.getElementById("tableGroupMembers").innerHTML = text; 
    })

fetch('/groupView/captionGroupName' + window.location.search)
    .then (response =>
    {
        return response.text();  
    }).then (text =>
    {
        document.getElementById("captionGroupName").innerHTML = text;
    })

fetch('/groupView/calenderAppointments' + window.location.search)
    .then(response =>
    {
        return response.text();  
    }).then (text =>
    {
        document.getElementById("calenderEntries").innerHTML = "<ul>" + text + "</ul>";
    })

//JQuery script to create the calender
$(document).ready(function() 
{
    var currentDate = new Date();
    function generateCalendar(d) 
    {
        function monthDays(month, year) 
        {
        var result = [];
        var days = new Date(year, month, 0).getDate();
        for (var i = 1; i <= days; i++) 
        {
            result.push(i);
        }
        return result;
        }
        Date.prototype.monthDays = function() 
        {
            var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
            return d.getDate();
        };
        var details = 
        {
        // totalDays: monthDays(d.getMonth(), d.getFullYear()),
            totalDays: d.monthDays(),
            weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        };
        var start = new Date(d.getFullYear(), d.getMonth()).getDay();
        var cal = [];
        var day = 1;
        for (var i = 0; i <= 6; i++) 
        {
            cal.push(['<tr>']);
            for (var j = 0; j < 7; j++) 
            {
                if (i === 0) {
                cal[i].push('<td>' + details.weekDays[j] + '</td>');
                } else if (day > details.totalDays) {
                cal[i].push('<td>&nbsp;</td>');
                } else {
                if (i === 1 && j < start) {
                    cal[i].push('<td>&nbsp;</td>');
                } else {
                    //cal[i].push('<td class="day"><button class="calender_buttons">' + day++ + '</button></td>');
                    cal[i].push('<td class="day" id="' + day + '"><button class="calender_buttons">' + day++ + '</button></td>');
                }
                }
            }
            cal[i].push('</tr>');
        }
        cal = cal.reduce(function(a, b) 
        {
            return a.concat(b);
        }, []).join('');
        $('#cal').append(cal);
        $('#month').text(details.months[d.getMonth()]);
        $('#year').text(d.getFullYear());
        $('#cal td.day').mouseover(function() {
        $(this).addClass('hover');
        }).mouseout(function() {
        $(this).removeClass('hover');
        });
    }
    $('#left').click(function() 
    {
        $('#cal').text('');
        if (currentDate.getMonth() === 0) 
        {
            currentDate = new Date(currentDate.getFullYear() - 1, 11);
            generateCalendar(currentDate);
        } 
        else 
        {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            generateCalendar(currentDate);
        }
    });
    $('#right').click(function() 
    {
        $('#cal').html('<tr></tr>');
        if (currentDate.getMonth() === 11) 
        {
            currentDate = new Date(currentDate.getFullYear() + 1, 0);
            generateCalendar(currentDate);
        } 
        else 
        {
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            generateCalendar(currentDate);
        }
    });
    generateCalendar(currentDate);
    var d = new Date();
    var day = d.getDate();
    document.getElementById(day).className = "currentDate"; 
});

//-------------------------------------------
//    PopUp Kalendereintrag hinzufügen
//-------------------------------------------

var popupKalender = document.getElementById("popupCalender-boxID");

var btnKalender = document.getElementById("terminErstellenBtn");

var spanKalender = document.getElementById("closePopupKalender");

btnKalender.onclick = function() 
{
    popupKalender.style.display = "block";
}

spanKalender.onclick = function() 
{
    popupKalender.style.display = "none";
}

window.onclick = function(event) 
{
    if (event.target == modal) {
        popupKalender.style.display = "none";
    }
}

//-------------------------------------------
//   PopUp Teilnehmer hinzufügen/löschen
//-------------------------------------------

var popupTeilnehmer = document.getElementById("popupModulTeilnehmer-boxID");

var btnAddTeilnehmer = document.getElementById("showAddTeilnehmerPopupBtn");
var btnDeleteTeilnehmer = document.getElementById("showDeleteTeilnehmerPopupBtn");

var spanTeilnehmer = document.getElementById("closePopupTeilnehmer");

btnAddTeilnehmer.onclick = function() 
{
    fetch('/groupView/memberEditView/tableAddableMembers' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("editMembersTable").innerHTML = text;
    })
    popupTeilnehmer.style.display = "block";
}

btnDeleteTeilnehmer.onclick = function() 
{
    fetch('/groupView/memberEditView/tableRemovableMembers' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("editMembersTable").innerHTML = text;
    })
    popupTeilnehmer.style.display = "block";
}

spanTeilnehmer.onclick = function() 
{
    popupTeilnehmer.style.display = "none";
}

window.onclick = function(event) 
{
    if (event.target == popupTeilnehmer) 
    {
        popupTeilnehmer.style.display = "none";
    }
}


