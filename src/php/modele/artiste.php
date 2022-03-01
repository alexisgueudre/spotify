<?php
require_once("database.php");


class artiste extends Database
{
    public function __construct() {
        $this->connectDatabase();
        $this->table = "artists";
    }
    public function SelectArtists()
    {
        $request =  $this->database->prepare("SELECT *  FROM ".$this->table.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        $api['artists'] = $result;
        $all = json_encode($api, JSON_FORCE_OBJECT);
        return $all;

    }
    public function SelectArtistCondition($condition)
    {
        $request =  $this->database->prepare("SELECT *  FROM ".$this->table." ".$condition.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        $api['artists'] = $result;
        $all = json_encode($api, JSON_FORCE_OBJECT);
        return $all;
    }
}