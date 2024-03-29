<?php
require '../../app/common.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'clientNotesPost.php';
  exit;
}
$clientId = intval($_GET['clientId'] ?? 0);
if ($clientId < 1) {
  throw new Exception('Invalid Client ID in URL');
}
//FETCH ALL
$notes = Notes::fetchNotesByClientId($clientId);
$json = json_encode($notes, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
echo $json;
