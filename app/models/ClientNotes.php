<?php
class Notes
{
  public $Id;
  public $clientId;
  public $employeeId;
  public $notes;

  public function __construct($data) {
  $this->Id = isset($data['Id']) ? intval($data['Id']) : null;
  $this->clientId = isset($data['clientId']) ? intval($data['clientId']) : null;
  $this->employeeId = isset($data['employeeId']) ? intval($data['employeeId']) : null;
  $this->notes = $data['notes'];
}
public static function fetchNotesByClientId(int $clientId) {
//trying this j
  $db = new PDO(DB_SERVER, DB_USER, DB_PW);
  //2. run a query
  $sql = 'SELECT * FROM clientNotes WHERE clientId = ?';
  $statement = $db->prepare($sql);
  //3. read the results
  $success = $statement->execute(
    [$clientId]
  );
  //4. handle the results
  $arr = [];
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $theClient = new Notes($row);
    array_push($arr, $theClient);
  }
  return $arr;
}
  public function create() {
    //1. connect to the SQLiteDatabase
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    $sql = 'INSERT clientNotes (Id, clientId, employeeId, notes)
            Values (?, ?, ?, ?)';
    $statement = $db->prepare($sql);
    $success = $statement->execute([
      $this->Id,
      $this->clientId,
      $this->employeeId,
      $this->notes
    ]);
    $this->id = $db->lastInsertId();
  }
}
