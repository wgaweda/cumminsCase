<?php
require '../../app/common.php';

//FETCH ALL
$comments = Login::fetchAll();

$json = json_encode($comments, JSON_PRETTY_PRINT);

header('Content-Type: application/json');

echo $json;
