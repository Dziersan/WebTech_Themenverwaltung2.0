
<?php
    include("databaseConnection.php")
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Gruppenansicht</title>
    <link rel="stylesheet" href="view/css/navigationBar.css" type="text/css">
    <link rel="stylesheet" href="../style/Gruppenansicht.css" type="text/css">
    <script src="../scripts/Gruppenansicht.js"></script>
</head>

<body>
<div id="UserMenu_All_Header">
    <div id="All_Header_left" class="All_Header_Boxes" style="float: left; margin-right: 5px">
        <a href="https://osca.hs-osnabrueck.de/">
            <div class="outer-wrapper" style="float:left">
                <div class="frame" style="height: 52px">
                    <img id="oscaImagelogo" class="oscaLogo">
                </div>
            </div>
        </a>

        <div class="dropdown">
            <form action="../Modulgruppenverwaltung/ModulgruppenMain.html">
                <button class="header_button">Modulverwaltung</button>
            </form>
            <div class="dropdown-content">
                <a href="">Placeholder01</a> <!-- Hier sollen alle gewählte Module im DropDown angezeigt werden. -->
                <a href="">Placeholder02</a>
            </div>
        </div>

        <div class="dropdown">
            <form action="/myGroups">
                <button class="header_button">Meine Gruppe</button>
            </form>
            <div class="dropdown-content">
                <a href="/joinGroup">Gruppe beitreten</a>
                <a href="/requirementsdefinition">Anforderungsdefinition</a>
            </div>
        </div>

        <div class="dropdown">
            <form action="/presentation">
                <button class="header_button">Präsentation</button>
            </form>
        </div>
    </div>

    <div id="All_Header_right" class="All_Header_Boxes" style="float: right">

        <div class="frame" style="float: left;">
            <a href="https://my.hs-osnabrueck.de/owa/">
                <div class="outer-wrapper" style="float:left">
                    <div class="frame" style="height: 52px">
                        <i id="mailIcon" class="far fa-envelope fa-lg" style="font-size: 25px"></i>
                    </div>
                </div>
            </a>
        </div>
        <div class="frame" style="float: left;">
            <a href="https://netcase.hs-osnabrueck.de">
                <div class="outer-wrapper" style="float:left">
                    <div class="frame" style="height: 52px">
                        <i id="netcaseIcon" class="fas fa-briefcase fa-lg" style="font-size: 25px"></i>
                    </div>
                </div>
            </a>
        </div>
        <div class="dropdown">
            <form action="/showUsers">
                <button class="header_button">Benutzer</button>
            </form>
        </div>
        <div class="dropdown">
            <form action="/logout" method="post">
                <button class="header_button" type="submit">Logout</button>
            </form>
        </div>
    </div>
</div>

<div class="pageContent">
    
    <div class="grid-header"> <!-- Überschriftenzeile -->
        <h1>Gravelshipping++</h1>
    </div>

    <div class="group-view">  <!-- Tabelle mit allen Modulteilnehmern -->
        <table>
            <thead>
                <th class="participant-name">Name</th>
                <th class="participant-email">E-Mail</th>
                <th class="participant-telefon">Telefon</th>
            </thead>
            <tbody>    
                <?php
                $result = dbQuery("SELECT * FROM `webtech`.`modul`");
                while($rows = mysqli_fetch_assoc($result)):; ?>
                <tr>
                    <td class="participant-name"><?php echo $rows["modul_id"]; ?></td>
                    <td class="participant-email"><?php echo $rows["beschreibung"]; ?></td>
                    <td class="participant-telefon"><?php echo $rows["teilnehmer_anzahl"]; ?></td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>
    <div class="calender-frame">  <!-- Kalender -->
        <div id="cal" class="calender">
            <div class="calendar__date">
                <div class="calendar__day">M</div>
                <div class="calendar__day">T</div>
                <div class="calendar__day">W</div>
                <div class="calendar__day">T</div>
                <div class="calendar__day">F</div>
                <div class="calendar__day">S</div>
                <div class="calendar__day">S</div>
                <div class="calendar__number"></div>
                <div class="calendar__number"></div>
                <div class="calendar__number"></div>
                <div class="calendar__number">1</div>
                <div class="calendar__number">2</div>
                <div class="calendar__number">3</div>
                <div class="calendar__number">4</div>
                <div class="calendar__number">5</div>
                <div class="calendar__number">6</div>
                <div class="calendar__number">7</div>
                <div class="calendar__number">8</div>
                <div class="calendar__number">9</div>
                <div class="calendar__number">10</div>
                <div class="calendar__number">11</div>
                <div class="calendar__number">12</div>
                <div class="calendar__number">13</div>
                <div class="calendar__number">14</div>
                <div class="calendar__number">15</div>
                <div class="calendar__number">16</div>
                <div class="calendar__number">17</div>
                <div class="calendar__number calendar__number--current">18</div>
                <div class="calendar__number">19</div>
                <div class="calendar__number">20</div>
                <div class="calendar__number">21</div>
                <div class="calendar__number">22</div>
                <div class="calendar__number">23</div>
                <div class="calendar__number">24</div>
                <div class="calendar__number">25</div>
                <div class="calendar__number">26</div>
                <div class="calendar__number">27</div>
                <div class="calendar__number">28</div>
                <div class="calendar__number">29</div>
                <div class="calendar__number">30</div>
            </div>
        </div>
        <div class="calender-notifications">
            Hier werden die Termine am ausgewählten Tag stehen.
        </div>
    </div>

    <div class="upload-section" style="border: 1px solid black">    <!-- Dateiupload-Sektion -->
        <form class="upload-box" method="post" action="">
            <input class="box__file" type="file" name="" id="file">
            <br><button class="box__button" type="submit">Upload</button>
        </form>
    </div>

    <div class="fileexpl" style="border: 1px solid black">    <!-- Dateiupload-Sektion -->
        Hier werden alle hochgeladenen Dateien für das Modul stehen.
        <button onclick="testAlert()">Drück mal!</button>
        <form action="">
            <textarea name="dbausgabe" id="anzeige_module" cols="30" rows="10"></textarea>
            <button onclick="zeigeModule()" style="width: 150px; height: 40px;">
                Zeige die Module in der Textbox!
            </button>
        </form>
    </div>

</div>

</body>
</html>