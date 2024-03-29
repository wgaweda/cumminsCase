<?php

class FetchClient
{
  public $clientId;
  public $clientName;
  public $sector;
  public $headquarters;

  public function __construct($data) {
  $this->clientId = isset($data['clientId']) ? intval($data['clientId']) : null;
  $this->clientName = $data['clientName'];
  $this->sector = $data['sector'];
  $this->headquarters = $data['headquarters'];

}
  public static function fetchAll() {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    //2. run a query
    $sql = 'SELECT * FROM client';
    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute();
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theClientList = new FetchClient($row);
      array_push($arr, $theClientList);
    }
    return $arr;
  }

//   public static function fetchByClientId(int $clientId) {
// //trying this j
//     $db = new PDO(DB_SERVER, DB_USER, DB_PW);
//
//     //2. run a query
//     $sql = 'SELECT * FROM client WHERE clientId = ?';
//     $statement = $db->prepare($sql);
//     //3. read the results
//     $success = $statement->execute(
//       [$clientId]
//     );
//     //4. handle the results
//     $arr = [];
//     while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
//       $theClient = new Client($row);
//       array_push($arr, $theClient);
//     }
//     return $arr;
//   }
}
