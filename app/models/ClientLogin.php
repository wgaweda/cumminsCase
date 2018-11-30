<?php

  class Login

  {
    public $Id;
    public $clientId;
    public $clientUsername;
    public $clientPassword;

    public function __construct($data) {
    $this->Id = isset($data['Id']) ? intval($data['Id']) : null;
    $this->clientId = isset($data['clientId']) ? intval($data['clientId']) : null;
    $this->clientUsername = $data['clientUsername'];
    $this->clientPassword  = $data['clientPassword'];

  }
    public static function fetchAll() {
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);
      //2. run a query
      $sql = 'SELECT * FROM clientLogin';
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
