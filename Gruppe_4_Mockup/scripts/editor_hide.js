<!--Bild Button sichtbar machen-->
function hideImages (idNr) {
            if (idNr < 2) {
                idNr = idNr + 1;
            } else {
                idNr = 1;
            }
            var id = "id" + idNr;
            for (var i = 2; i <= 2; i++) {
                var hideMe = document.getElementById("id" + [i]);
              <!--  hideMe.style.visibility = 'hidden'; Bei Anklicken wieder transparent-->
            }
            var showMe = document.getElementById(id);
            showMe.style.visibility = 'visible';
        }

<!--Bild Checkmark sichtbar machen-->
        function hideImages (idNr) {
            if (idNr < 4) {
                idNr = idNr + 1;
            } else {
                idNr = 3;
            }
            var id = "id" + idNr;
            for (var i = 4; i <= 3; i++) {
                var hideMe = document.getElementById("id" + [i]);
              <!--  hideMe.style.visibility = 'hidden'; Bei Anklicken wieder transparent-->
            }
            var showMe = document.getElementById(id);
            showMe.style.visibility = 'visible';
        }

<!--Bild Dropdown sichtbar machen-->
        function hideImages (idNr) {
            if (idNr < 6) {
                idNr = idNr + 1;
            } else {
                idNr = 5;
            }
            var id = "id" + idNr;
            for (var i = 6; i <= 5; i++) {
                var hideMe = document.getElementById("id" + [i]);
              <!--  hideMe.style.visibility = 'hidden'; Bei Anklicken wieder transparent-->
            }
            var showMe = document.getElementById(id);
            showMe.style.visibility = 'visible';
        }

<!--Bild Radiobutton sichtbar machen-->
        function hideImages (idNr) {
            if (idNr < 8) {
                idNr = idNr + 1;
            } else {
                idNr = 7;
            }
            var id = "id" + idNr;
            for (var i = 8; i <= 7; i++) {
                var hideMe = document.getElementById("id" + [i]);
              <!--  hideMe.style.visibility = 'hidden'; Bei Anklicken wieder transparent-->
            }
            var showMe = document.getElementById(id);
            showMe.style.visibility = 'visible';
        }

<!-- Square sichtbar machen -->
$( "#clicksquare" ).click(function() {
    $( "#mySquare" ).toggle( "fast", function() {
        // Animation complete.
    });
});

<!-- Circle sichtbar machen -->
$( "#clickcircle" ).click(function() {
    $( "#myCircle" ).toggle( "fast", function() {
        // Animation complete.
    });
});

<!-- Text sichtbar machen -->
$( "#clicktext" ).click(function() {
    $( "#myText" ).toggle( "fast", function() {
        // Animation complete.
    });
});

<!-- Überschrift sichtbar machen -->
$( "#clickhead" ).click(function() {
    $( "#myHead" ).toggle( "fast", function() {
        // Animation complete.
    });
});