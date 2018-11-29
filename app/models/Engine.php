<?php

class Turbine

{
  public $engineId;
  public $engineName;
  public $power;
  public $torque;
  public $certification;


  public function __construct($data) {
  $this->engineId = isset($data['engineId']) ? intval($data['engineId']) : null;
  $this->engineName = $data['engineName'];
  $this->power = $data['power'];
  $this->torque = $data['torque'];
  $this->certification = $data['certification'];
}

  // public static function fetchAll() {
  //
  //   $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //
  //   //2. run a query
  //   $sql = 'SELECT * FROM turbine';
  //   $statement = $db->prepare($sql);
  //   //3. read the results
  //   $success = $statement->execute();
  //   //4. handle the results
  //   $arr = [];
  //   while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
  //     $theturbine = new Turbine($row);
  //     array_push($arr, $theturbine);
  //   }
  //   return $arr;
  // }

  public static function fetchByTurbineId(int $siteId) {
//trying this j
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * FROM engine, engineDeployed
    WHERE engine.engineId = engineDeployed.engineId
    AND engineDeployed.clientId = ?';

    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute(
      [$siteId]
    );
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theTurbine = new Turbine($row);
      array_push($arr, $theTurbine);
    }
    return $arr;
  }

}
