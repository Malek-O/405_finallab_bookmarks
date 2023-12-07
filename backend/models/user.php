<?php 

global $errorMessage;

class User {

    private $id;
    private $username;
    private $password;
    private $dbConnection;

    public function __construct($dbConnection){
        $this->dbConnection = $dbConnection;
    }

    public function setUsername ($username){
     return $this->username = $username;
    }

    public function setPassword($password){
     return $this->password = $password;
    }

    public function createUser(){
         
        $hashedPWd = password_hash($this->password, PASSWORD_DEFAULT);
        $query = "INSERT INTO user (username, password) VALUES(?,?)";

        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(1, $this->username);
        $stmt->bindParam(2, $hashedPWd);
        try {
            if ($stmt->execute()) {
            return true;
        }
        } catch (Exception $e) {
             $GLOBALS['errorMessage']= $e->getMessage();
             return false;
        }
      
       
    }

    public function loginUser(){
         
        // $dehshing = password_verify($pwd, $pwsHashed);
        $query1 = "SELECT * from user where username = ?";
        $stmt = $this->dbConnection->prepare($query1);
        $stmt->bindParam(1, $this->username);
        try {
             if ($stmt->execute()) {
             $result = $stmt->fetch(PDO::FETCH_ASSOC);
             if($result){
                    $dehshing = password_verify($this->password, $result['password']);
                    if(!$dehshing){
                        $GLOBALS['errorMessage']= "Username or password is wrong";
                        return false;
                    }
                     session_set_cookie_params([
                        'lifetime' => 0, // Set to 0 to expire when the browser is closed
                        'secure' => true, // Set to true to require a secure context (HTTPS)
                        'samesite' => 'None', // Set SameSite to None
                    ]);
                    session_start();
                    $_SESSION['username'] = $result['username'];
                    $_SESSION['user_id'] = $result['id'];
                    return true;
             }else{
                $GLOBALS['errorMessage']= "Username or password is wrong";
                 return false;
             }
        }
        } catch (Exception $e) {
             $GLOBALS['errorMessage']= $e->getMessage();
             return false;
        }
       
     
    }

}