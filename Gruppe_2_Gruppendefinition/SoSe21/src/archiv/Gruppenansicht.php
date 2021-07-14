<?php

include("databaseConnection.php");

function getStudentName()
{
    $query = "SELECT Name FROM Student WHERE Name = 'Maurice'";
    $result = mysqli_query($con ,$query);
}