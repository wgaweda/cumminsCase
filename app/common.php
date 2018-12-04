<?php

//Change the working directory to this file
chdir( __DIR__ );
set_include_path ( __DIR__ );

if ($_SERVER['REQUEST_METHOD'] == 'POST'
&& stripos($_SERVER['CONTENT_TYPE'], 'application/json') !== false ) {
  $_POST = json_decode(file_get_contents('php://input'), true);
}

require 'environment.php';

/** models **/
require 'models/Client.php';
require 'models/Engine.php';
require 'models/EngineDeployed.php';
require 'models/TimeSeries.php';
require 'models/SalesOrder.php';
require 'models/ClientLogin.php';
require 'models/CumminsLogin.php';
require 'models/AllClient.php';
require 'models/ClientNotes.php';
