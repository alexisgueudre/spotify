<?php

header('Access-Control-Allow-Origin: *');

header(`Content-Type: application/json`);

try {
    $db = new PDO('mysql:host=localhost;dbname=database_musics', 'mariam', 'jjaf2010ap'); //////
} catch (Exception $e) {
    $return["success"] = false;
    $return["message"] = "Connexion à la base de données impossible.";
};

// recuperation des artistes

$artists = $db->prepare("SELECT * FROM artists");
$artists->execute();
$artistsJSON = $artists->fetchAll();
$api['artists'] = $artistsJSON;

// condition récupration artistes détailes

if (isset($_POST['artist_id'])) {
    $albums_artiste = $db->prepare("SELECT * FROM albums WHERE artist_id='" . $_POST['artist_id'] . "'");
    $albums_artiste->execute();
    $albums_artiste_JSON = $albums_artiste->fetchAll();
    echo (json_encode(($albums_artiste_JSON)));
    exit();
}

// recuperation des genres

$genres = $db->prepare("SELECT * FROM genres");
$genres->execute();
$genresJSON = $genres->fetchAll();
$api['genres'] = $genresJSON;

// condition récuperation genre détails

if (isset($_POST['genre_id'])) {
    $albums_genre = $db->prepare("SELECT * FROM albums INNER JOIN genres_albums on albums.id=genres_albums.album_id INNER JOIN genres on genres_albums.genre_id=genres.id WHERE genres.id='" . $_POST['genre_id'] . "';");
    $albums_genre->execute();
    $albums_genre_JSON = $albums_genre->fetchAll();
    echo (json_encode(($albums_genre_JSON)));
    exit();
}

// genre albums

$genres_albums = $db->prepare("SELECT * FROM genres_albums");
$genres_albums->execute();
$genres_albumsJSON = $genres_albums->fetchAll();
$api['genres_albums'] = $genres_albumsJSON;

// recuperation des albums

$albums = $db->prepare("SELECT * FROM albums");
$albums->execute();
$albumsJSON = $albums->fetchAll();
$api['albums'] = $albumsJSON;

// condition récupration albums détails

if (isset($_POST['album_id'])) {
    $tracks = $db->prepare("SELECT * FROM tracks WHERE album_id='" . $_POST['album_id'] . "'");
    $tracks->execute();
    $tracksJSON = $tracks->fetchAll();
    echo (json_encode($tracksJSON));
    exit();
}

// recuperation des tracks

$tracks = $db->prepare("SELECT * FROM tracks");
$tracks->execute();
$tracksJSON = $tracks->fetchAll();
$api['tracks'] = $tracksJSON;


// condition recherche

if (isset($_POST['search'])) {
    $albums_search = $db->prepare("SELECT * FROM albums WHERE name LIKE '%" . $_POST['search'] . "%';");
    $albums_search->execute();
    $albums_search_JSON = $albums_search->fetchAll();
    echo (json_encode($albums_search_JSON));
    exit();
}

$all = json_encode($api, JSON_FORCE_OBJECT);
echo $all;
