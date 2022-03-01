<?php
require_once("database.php");


class genre extends Database
{
    protected $table = null;
    public function __construct() {
        $this->connectDatabase();
        $this->table = "genres";
    }
    public function SelectGenre()
    {
        $request =  $this->database->prepare("SELECT *  FROM ".$this->table.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        $api['genres'] = $result;
        $all = json_encode($api, JSON_FORCE_OBJECT);
        return $all;

    }
    public function SelectGenreCondtion($condition)
    {
        $request =  $this->database->prepare("SELECT *  FROM ".$this->table." ".$condition.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        $api['genres'] = $result;
        $all = json_encode($api, JSON_FORCE_OBJECT);
        return $all;

    }
}
