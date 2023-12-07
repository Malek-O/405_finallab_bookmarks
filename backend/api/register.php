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

include_once '../db/Database.php';
include_once '../models/user.php';


$database = new Database();
$dbConnection = $database->connect();

$user = new User($dbConnection);

$data = json_decode(file_get_contents('php://input'),true);

if(!$data || !isset($data['username']) || !isset($data['password'])){
    http_response_code(422);
     echo json_encode(
        ['message' => 'Error missing required field']
    );
    return;
}

$username = trim($data['username']);
$username = preg_replace("/[^a-zA-Z0-9]/", "", $username);
$password = trim($data['password']);

$user->setUsername($username);
$user->setPassword($password);


if($user->createUser()){
       echo json_encode(
        ['message' => 'User created']
    );
}else{
    http_response_code(400);
     echo json_encode(
        ['message' => $GLOBALS['errorMessage']]
    );
}
