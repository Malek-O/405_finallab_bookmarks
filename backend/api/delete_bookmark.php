<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: DELETE , OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true"); // add this header

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit;
}


include_once '../db/Database.php';
include_once '../models/bookmark.php';


$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);


$GLOBALS['errorMessage'];

if(!isset($_GET['id'])){
    http_response_code(422);
     echo json_encode(
        ['message' => 'Error missing required field']
    );
}


$bookmark->setId($_GET['id']);

if($bookmark->DeleteBookmark()){
      echo json_encode(
        ['message' => 'Bookmark deleted']
    );
}else{
     echo json_encode(
        ['message' => $GLOBALS['errorMessage']]
    );
}
