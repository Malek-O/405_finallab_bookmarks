<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: GET , OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true"); // add this header

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
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
$GLOBALS['arrResult'];

if($bookmark->getUserBookmark()){
      echo json_encode($GLOBALS['arrResult']);
}else{
     echo json_encode(['message' => $GLOBALS['errorMessage']]);
}