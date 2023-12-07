<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Content-type: application/json');
header('Access-Control-Allow-Methods: POST , OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Credentials: true"); // add this header

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit;
}

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    header("Allow: POST");
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    return;
}


include_once '../db/Database.php';
include_once '../models/bookmark.php';


$database = new Database();
$dbConnection = $database->connect();

$bookmark = new Bookmark($dbConnection);

$data = json_decode(file_get_contents('php://input'),true);


if(!isset($_COOKIE['PHPSESSID'])){
   http_response_code(401);
     echo json_encode(
        ['message' => 'Unauthorized']
    );
    return;
}

$phpSessionId = $_COOKIE['PHPSESSID'];
session_id($phpSessionId);
session_start();

if(!$data || !isset($data['title']) || !isset($data['url']) || !isset($data['shareable']) || !isset($_SESSION['user_id'])){
    http_response_code(422);
     echo json_encode(
        ['message' => 'Error missing required field']
    );
    return;
}

$bookmark->setTitle($data['title']);
$bookmark->setUrl($data['url']);
$bookmark->setUserId($_SESSION['user_id']);
$bookmark->setShareable($data['shareable']);


if($bookmark->createBookmark()){
      echo json_encode(
        ['message' => "Bookmark created"]
    );
}else{
    http_response_code(400);
     echo json_encode(
        ['message' => $GLOBALS['errorMessage']]
    );
}

