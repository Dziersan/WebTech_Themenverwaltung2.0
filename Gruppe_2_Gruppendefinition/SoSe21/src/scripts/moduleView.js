fetch('/moduleView/Header' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
{
    document.getElementById("moduleViewHeader").innerHTML = text;
    document.getElementById("popupAddModuleParticipantsHeader").innerHTML = text;
    document.getElementById("popupDeleteModuleParticipantsHeader").innerHTML = text;
})

fetch('/moduleView/moduleParticipants' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
{
    document.getElementById("moduleParticipants").innerHTML = text;
})

fetch('/moduleView/moduleGroups' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
{
    document.getElementById("moduleGroups").innerHTML = text;
})

fetch('/moduleView/deleteParticipantsView/moduleParticipants' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
{
    document.getElementById("deleteParticipantsViewModuleParticipants").innerHTML = text;
})

fetch('/moduleView/groupDistributionView/tableSelectUser' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("autoDistribUserTable").innerHTML = text;
    });
    
fetch('/moduleView/groupDistributionView/tableSelectGroups' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("autoDistribGroupsTable").innerHTML = text;
    });

fetch('/moduleViewUser/moduleGroups' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
    document.getElementById("moduleGroupsUser").innerHTML = text;
    })

var btnCreateInviteCode = document.getElementById("btnCreateInviteCode");
btnCreateInviteCode.onclick = function()
{
    fetch('/moduleView/createInviteCode' + window.location.search)
        .then (response =>
        {
            console.log(response);
            return response.text();
        }).then (text =>
        {
            document.getElementById("inviteCodeLabel").value = text;
            document.getElementById("inviteCodeLabel").hidden = false;
            document.getElementById("copyInviteCode").hidden = false;
        });
}

function copyInviteCodeToClipboard() 
{
    var copyText = document.getElementById("inviteCodeLabel");
    copyText.select();
    document.execCommand("copy");
    document.getElementById("copyToClipboardInfo").hidden = false;
}

var btnSearchStudents = document.getElementById("findStudentsBtn");
btnSearchStudents.onclick = function() 
{
    var searchValue = document.getElementById("searchValueID").value;
    var searchType = document.getElementById("searchTypeID").value;
    fetch('/moduleView/addMemberView/userLookup' + window.location.search, 
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({value : searchValue, type : searchType })
    })
    .then (response =>
    {
        return response.text();
    }).then (text =>
    {
        console.log("Tabelle sollte gefüllt sein");
        document.getElementById("userLookupTable").innerHTML = text;
    })
}

var popupAddModuleParticipant = document.getElementById("popupAddModuleParticipant-boxID");
var btnOpenPopupAddModuleParticipant = document.getElementById("openPopupAddModuleParticipantBtnID");
var closePopupAddModuleParticipant = document.getElementById("closePopupAddModuleParticipant");
btnOpenPopupAddModuleParticipant.onclick = function()
{
    popupAddModuleParticipant.style.display = "block";
}
closePopupAddModuleParticipant.onclick = function() 
{
    popupAddModuleParticipant.style.display = "none";
}

var popupDeleteModuleParticipant = document.getElementById("popupDeleteModuleParticipant-boxID");
var btnOpenPopupDeleteModuleParticipant = document.getElementById("openPopupDeleteModuleParticipantBtnID");
var closePopupDeleteModuleParticipant = document.getElementById("closePopupDeleteModuleParticipant");
btnOpenPopupDeleteModuleParticipant.onclick = function() {
    popupDeleteModuleParticipant.style.display = "block";
}
closePopupDeleteModuleParticipant.onclick = function() {
    popupDeleteModuleParticipant.style.display = "none";
}

var popupAddModuleGroup = document.getElementById("popupAddModuleGroup-boxID");
var btnOpenPopupAddModuleGroup = document.getElementById("openPopupAddModuleGroupBtnID");
var closePopupAddModuleGroup = document.getElementById("closePopupAddModuleGroup");

btnOpenPopupAddModuleGroup.onclick = function() 
{
    popupAddModuleGroup.style.display = "block";
}

closePopupAddModuleGroup.onclick = function() 
{
    popupAddModuleGroup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popupAddModuleGroup) 
    {
        popupAddModuleGroup.style.display = "none";
    }
    if (event.target == popupAddModuleParticipant) 
    {
        popupAddModuleParticipant.style.display = "none";
    }
    if (event.target == popupDeleteModuleParticipant) 
    {
        popupDeleteModuleParticipant.style.display = "none";
    }
    if (event.target == popupAutoDistribution) 
    {
        popupAutoDistribution.style.display = "none";
    }
}

//-------------------------------------------
//   PopUp Teilnehmer automatisch verteilen
//-------------------------------------------

var popupAutoDistribution = document.getElementById("popupAutomaticDistribution-boxID");
var btnAutoDistribution = document.getElementById("showAutomaticDistributionWindowBtn");
var spanAutoDistribution = document.getElementById("closeAutoDistribution");

btnAutoDistribution.onclick = function() 
{
    /*fetch('/moduleView/groupDistributionView/tableSelectUser' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("autoDistribUserTable").innerHTML = text;
    });
    fetch('/moduleView/groupDistributionView/tableSelectGroups' + window.location.search)
    .then (response =>
    {
        console.log(response);
        return response.text();
    }).then (text =>
    {
        document.getElementById("autoDistribGroupsTable").innerHTML = text;
    });*/
    popupAutoDistribution.style.display = "block";
}

spanAutoDistribution.onclick = function() 
{
    popupAutoDistribution.style.display = "none";
}

