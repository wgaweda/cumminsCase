
<?php
require '../../app/common.php';

$siteId = intval($_GET['engineDeployedId'] ?? 0);

if ($siteId < 1) {
  throw new Exception('Invalid EID in URL');
}


//FETCH ALL
$sensorsTS = Series::fetchById($siteId);

$json = json_encode($sensorsTS, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
