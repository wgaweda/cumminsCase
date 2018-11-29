<?php

class TurbDeployed

{
  public $engineDeployedId;
  public $engineId;
  public $clientId;
  public $deployedDate;
  public $serialNumber;
  public $totalFiredHours;
  public $totalStarts;
  public $lastMaintenanceDate;


  public function __construct($data) {
  $this->engineDeployedId = isset($data['engineDeployedId']) ? intval($data['engineDeployedId']) : null;
  $this->engineId = isset($data['engineId']) ? intval($data['engineId']) : null;
  $this->clientId = $data['clientId'];
  $this->deployedDate = $data['deployedDate'];
  $this->serialNumber = $data['serialNumber'];
  $this->totalFiredHours = $data['totalFiredHours'];
  $this->totalStarts = $data['totalStarts'];
  $this->lastMaintenanceDate = $data['lastMaintenanceDate'];
}

public static function fetchByTurbId(int $siteId) {
//trying this j
  $db = new PDO(DB_SERVER, DB_USER, DB_PW);

  //2. run a query
  $sql = 'SELECT * FROM engineDeployed
  WHERE clientId = ?';

  $statement = $db->prepare($sql);
  //3. read the results
  $success = $statement->execute(
    [$siteId]
  );
  //4. handle the results
  $arr = [];
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $theTurbine = new TurbDeployed($row);

    array_push($arr, $theTurbine);
  }
  return $arr;
}
}
