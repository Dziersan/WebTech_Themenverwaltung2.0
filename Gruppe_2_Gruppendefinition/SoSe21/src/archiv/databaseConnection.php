<?php
$GLOBALS['dbhost'] = '127.0.0.1'; 
$GLOBALS['dbuser'] = 'root';
$GLOBALS['dbpassword'] = 'hallo,hallo';
$GLOBALS['dbname'] = 'WEBTECH';

// mysql select query

function dbQuery($queryParam)
{
    if(!$con = mysqli_connect($GLOBALS['dbhost'], $GLOBALS['dbuser'], $GLOBALS['dbpassword'], $GLOBALS['dbname']))
    {
        die("Verbindungsversuch fehlgeschlagen");
    }
    else
    {
        //echo "Verbindung hergestellt!";
    }
    $query = $queryParam;
    $result = mysqli_query($con, $query);
    return $result;
}

?>