<?php 

class Database {
    private $dbHost;        
    private $dbPort;
    private $dbUser;
    private $dbPassword;
    private $dbName;
    private $dbConnection;

    public function __construct(){
        $this->dbHost = "localhost";
        $this->dbPort = "3306";
        $this->dbUser = "root";
        $this->dbPassword = "";
        $this->dbName = "bookmark_final";
        if(!$this->dbHost || !$this->dbPort || !$this->dbUser  || !$this->dbName){
            die("Database configuration error");
        }   
    }

    public function connect(){
        try {
            $this->dbConnection = new PDO("mysql:host=$this->dbHost;port=$this->dbPort;dbname=$this->dbName", $this->dbUser, $this->dbPassword);
            $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
           die("Database connection error");
        }   
        return $this->dbConnection;
    }
     
}