<?php
require_once("database.php");


class track extends Database
{
    protected $table = null;
    public function __construct() {
        $this->connectDatabase();
        $this->table = "tracks";
    }
    public function SelectTracks()
    {
        $request =  $this->database->prepare("SELECT *  FROM ".$this->table.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        $api['tracks'] = $result;
        $all = json_encode($api, JSON_FORCE_OBJECT);
        return $all;

    }
    public function SelectTracksCondtion($condition)
    {
        $request =  $this->database->prepare("SELECT *  FROM ".$this->table." ".$condition.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        $api['tracks'] = $result;
        $all = json_encode($api, JSON_FORCE_OBJECT);
        return $all;

    }
}