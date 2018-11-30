<?php

class Sales

{
  public $orderId;
  public $clientId;
  public $engineId;
  public $orderDate;
  public $orderQuantity;
  public $orderStatus;

  public function __construct($data) {
  $this->orderId = isset($data['orderId']) ? intval($data['orderId']) : null;
  $this->clientId = isset($data['clientId']) ? intval($data['clientId']) : null;
  $this->engineId = isset($data['engineId']) ? intval($data['engineId']) : null;
  $this->orderDate = $date['orderDate'];
  $this->orderQuantity = $data['orderQuantity'];
  $this->orderStatus = $data['orderStatus'];


}

  public static function fetchById(int $siteId) {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * from salesOrder, client
    WHERE salesOrder.clientId = client.clientId
    AND salesOrder.clientId = ?';

    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute(
      [$siteId]
    );
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSeries = new Sales($row);
      array_push($arr, $theSeries);
    }
    return $arr;
  }
}
