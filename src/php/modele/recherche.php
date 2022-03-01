<?php
require_once("database.php");

class recherche extends Database
{
    protected $table = null;
    public function __construct()
    {
        $this->connectDatabase();
    }

    public function searchTitleMusics($titleMusics)
    {
        $this->table = "tracks";

        $request =  $this->database->prepare("SELECT * FROM ".$this->table." WHERE name = ".$titleMusics.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($result);

    }
    public function searchTitleAlbums($titleAlbum)
    {
        $this->table = "albums";
        $request =  $this->database->prepare("SELECT * FROM ".$this->table." WHERE name = ".$titleAlbum.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($result);
    }
    public function searchByNameArtist($nameArtist)
    {
        $this->table = "artists";
        $request =  $this->database->prepare("SELECT * FROM ".$this->table." WHERE name = ".$nameArtist.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($result);
    }
    public function searchByGenre($genre)
    {
        $this->table = "genre";
        $request =  $this->database->prepare("SELECT * FROM ".$this->table." WHERE name = ".$genre.";");
        $request->execute();
        $result = $request->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($result);
    }
}