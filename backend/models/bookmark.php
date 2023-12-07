<?php 

global $errorMessage;
global $arrResult;

class Bookmark {

    private $id;
    private $title;
    private $url;
    private $createdAt;
    private $userId;
    private $shareable = false;
    private $dbConnection;

    public function __construct($dbConnection){
        $this->dbConnection = $dbConnection;
    }

    public function setTitle ($title){
     return $this->title = $title;
    }
    public function setUrl($url){
     return $this->url = $url;
    }
    public function setUserId($userId){
     return $this->userId = $userId;
    }
     public function setShareable($shareable){
     return $this->shareable = $shareable;
    }

     public function setId($id){
     return $this->id = $id;
    }

    public function getId(){
        return $this->id;
    }
    public function getTitle(){
        return $this->title;
    }
     public function getUrl(){
        return $this->url;
    }

    public function createBookmark(){

        $query = "INSERT INTO bookmark (title,url,userId,shareable) VALUES(?,?,?,?)";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(1, $this->title);
        $stmt->bindParam(2, $this->url);
        $stmt->bindParam(3, $this->userId);
        $stmt->bindParam(4, $this->shareable);
         try {
            if ($stmt->execute()) {
            return true;
        }
        } catch (Exception $e) {
             $GLOBALS['errorMessage']= $e->getMessage();
             return false;
        }    
    }

    public function getAllBookmark(){
        $query = "SELECT User.id AS userId, User.username, Bookmark.id AS bookmarkId, Bookmark.title, Bookmark.url, Bookmark.createdAt
        FROM User
        JOIN Bookmark ON User.id = Bookmark.userId where Bookmark.shareable > 0;";
        $stmt = $this->dbConnection->prepare($query);
        try {
             if ($stmt->execute()) {
                 $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                 if($stmt->rowCount() > 0){
                    $GLOBALS['arrResult'] = $result;
                    return true;
                 }else{
                    $GLOBALS['arrResult'] = [];
                    return true;
                 }
             }else{
                $GLOBALS['errorMessage'] = "Something went wrong";
                return false;
             }
        } catch (Exception $e) {
            $GLOBALS['errorMessage'] = $e->getMessage();
             return false;
        }

    }

    public function getUserBookmark(){

        if(!isset($_COOKIE['PHPSESSID'])){
            http_response_code(401);
            $GLOBALS['errorMessage'] = "unauthroized";
            return;
        }

        $phpSessionId = $_COOKIE['PHPSESSID'];
        session_id($phpSessionId);
        session_start();

        $query = "SELECT * from bookmark where userId = ?";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(1, $_SESSION['user_id']);

        try {
             if ($stmt->execute()) {
                 $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                 if($stmt->rowCount() > 0){
                    $GLOBALS['arrResult'] = $result;
                    return true;
                 }else{
                    $GLOBALS['arrResult'] = [];
                    return true;
                 }
             }else{
                $GLOBALS['errorMessage'] = "Something went wrong";
                return false;
             }
        } catch (Exception $e) {
            $GLOBALS['errorMessage'] = $e->getMessage();
            return false;
        }
     
    }

     public function DeleteBookmark(){

        if(!isset($_COOKIE['PHPSESSID'])){
            http_response_code(401);
            $GLOBALS['errorMessage'] = "unauthroized";
            return;
        }

        $phpSessionId = $_COOKIE['PHPSESSID'];
        session_id($phpSessionId);
        session_start();
        
        $query = "DELETE from bookmark where id = ? AND userId = ?";
        $stmt = $this->dbConnection->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->bindParam(2, $_SESSION['user_id']);

        try {
            $stmt->execute();
            $rowCount = $stmt->rowCount();
            if ($rowCount > 0) {
                return true;
            }else{
                 http_response_code(403);
                 $GLOBALS['errorMessage'] = "Bookmark not found";
                 return false;
            }
        } catch (Exception $e) {
            http_response_code(500);
            $GLOBALS['errorMessage'] = $e->getMessage();
            return false;
        }
    }

}