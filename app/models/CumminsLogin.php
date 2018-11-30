<?php

  class Cummins

  {
    public $employeeId;
    public $cumminsUsername;
    public $cumminsPassword;

    public function __construct($data) {
    $this->employeeId = isset($data['employeeId']) ? intval($data['employeeId']) : null;
    $this->cumminsUsername = $data['cumminsUsername'];
    $this->cumminsPassword  = $data['cumminsPassword'];

  }
    public static function fetchAll() {
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);
      //2. run a query
      $sql = 'SELECT * FROM cumminsLogin';
      $statement = $db->prepare($sql);
      //3. read the results
      $success = $statement->execute();
      //4. handle the results
      $arr = [];
      while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $theClientList = new Login($row);
        array_push($arr, $theClientList);
      }
      return $arr;
    }
  //
  //   public static function fetchByClientId(int $clientId) {
  // //trying this j
  //     $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //
  //     //2. run a query
  //     $sql = 'SELECT * FROM clientLogin';
  //     $statement = $db->prepare($sql);
  //     //3. read the results
  //     $success = $statement->execute(
  //       [$clientId]
  //     );
  //     //4. handle the results
  //     $arr = [];
  //     while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
  //       $theClient = new Login($row);
  //       array_push($arr, $theClient);
  //     }
  //     return $arr;
  //   }
  }
