<?php

class Series

{
  public $Id;
  public $engineDeployedId;
  public $dataCollectedDate;
  public $output;
  public $heatRate;
  public $compressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;
  public $starts;


  public function __construct($data) {
  $this->Id = isset($data['Id']) ? intval($data['Id']) : null;
  $this->engineDeployedId = isset($data['engineDeployedId']) ? intval($data['engineDeployedId']) : null;
  $this->dataCollectedDate = $data['dataCollectedDate'];
  $this->output = intval($data['output']);
  $this->heatRate = intval($data['heatRate']);
  $this->compressorEfficiency = intval($data['compressorEfficiency']);
  $this->availability = intval($data['availability']);
  $this->reliability = intval($data['reliability']);
  $this->firedHours = intval($data['firedHours']);
  $this->trips = intval($data['trips']);
  $this->starts = intval($data['starts']);

}

  public static function fetchById(int $siteId) {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * from timeSeries, engineDeployed
    WHERE timeSeries.engineDeployedId = engineDeployed.engineDeployedId
    AND engineDeployed.clientId = ?';

    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute(
      [$siteId]
    );
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSeries = new Series($row);
      array_push($arr, $theSeries);
    }
    return $arr;
  }
}
