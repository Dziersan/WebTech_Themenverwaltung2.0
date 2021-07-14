<?php
include_once("databaseConnection.php");

$query = "Select * from Modul";
$result = mysqli_query($con, $query);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <textarea name="test" id="test" cols="30" rows="10">
        <?php
            if (mysqli_num_rows($result) > 0) 
            {
                // output data of each row
                while($row = mysqli_fetch_assoc($result)) 
                {
                  echo "id: " . $row["modul_id"]. " - Name: " . $row["beschreibung"]. " " . $row["teilnehmer_anzahl"]."<br>";
                }
            }
        ?>
    </textarea>
</body>
</html>

