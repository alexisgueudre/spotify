<?php
include_once "modele/genre.php";
include_once "modele/album.php";
include_once "modele/artiste.php";
include_once "modele/track.php";

class api
{
    public function requestArtiste($id)
    {
        $condition = null;
        $artiste = new artiste();
        if (!empty($id))
        {
            $condition = //artistt par album ;
        }
        if  ($condition == null)
        {
            $artiste->SelectArtists();
        }else
        {
            $artiste->SelectArtistCondition($condition);
        }
    }

    public function requestAlbum($id)
    {
        $condition = null;
        $album = new album();
        if (!empty($id))
        {
            $condition = /*
                            pour afficher les nbr track  et le genre des albums
                         */;
        }
        if  ($condition == null)
        {
            $album->SelectAlbums();
        }else
        {
            $album->SelectAlbumsCondtion($condition);
        }
    }
    public function requestTrack($id)
    {
        $condition = null;
        $track = new track;

        if (!empty($id))
        {
            $condition = //track par id ;
        }
        if  ($condition == null)
        {
            $track->SelectTracks();
        }else
        {
            $track->SelectTracksCondtion($condition);
        }
    }
    public function requestGenre($id)
    {
        $condition = null;
        $genre = new genre();
        if (!empty($id))
        {
            $condition = //genre / album ;
        }
        if  ($condition == null)
        {
            $genre->SelectGenre();
        }else
            {
                $genre->SelectGenreCondtion($condition);
            }
    }
}

