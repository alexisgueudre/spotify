<?php
require_once("database.php");

class album extends Database
{
    protected $table = null;
    public function __construct() {
        $this->connectDatabase();
        $this->table = "albums";
    }
    public function SelectAlbums()
    {
        $request =  $this->database->prepare("SELECT *  FROM ".$this->table.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        $api['albums'] = $result;
        $all = json_encode($api, JSON_FORCE_OBJECT);
        return $all;
    }

    public function SelectAlbumsCondtion($condition)
    {
        $request =  $this->database->prepare("SELECT *  FROM ".$this->table." ".$condition.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        $api['albums'] = $result;
        $all = json_encode($api, JSON_FORCE_OBJECT);
        return $all;
    }

}