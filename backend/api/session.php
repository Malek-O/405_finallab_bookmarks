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


if(isset($_SESSION['username'])){
         echo json_encode(
        ['username' => $_SESSION['username']]
    );
}else{
     http_response_code(403);
     echo json_encode(
        ['message' => "No session"]
    );
}