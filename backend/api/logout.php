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

if($_SERVER['REQUEST_METHOD'] !== 'GET'){
    header("Allow: POST");
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
    return;
}

include_once '../db/Database.php';

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
session_unset();
session_destroy();

echo json_encode(['success' => true]);

