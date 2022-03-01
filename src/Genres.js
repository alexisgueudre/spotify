import React from 'react'

class Genres extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            showGenre: false,
            currentGenre: null,
            showAlbum: false,
            imgAlbum: null
        };
    }

    openAlbum(id, img) {
        fetch("http://localhost/WAC/W1%20-%20Projets%20Web/W-WEB-090-PAR-1-1-spotify-yanis.benhagouga/src/api.php", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "album_id=" + id
        })
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    let test = result
                    this.setState({
                        isLoaded: true,
                        items: test,
                        showAlbum: true,
                        imgAlbum: img,
                        showGenre: false
                    });
                },
                
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    openGenre(id, genre) {
        fetch("http://localhost/WAC/W1%20-%20Projets%20Web/W-WEB-090-PAR-1-1-spotify-yanis.benhagouga/src/api.php", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "genre_id=" + id
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let test = result
                    this.setState({
                        isLoaded: true,
                        items: test,
                        showGenre: true,
                        currentGenre: genre
                    });
                },
                
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        fetch("http://localhost/WAC/W1%20-%20Projets%20Web/W-WEB-090-PAR-1-1-spotify-yanis.benhagouga/src/api.php")
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result);
                    let test = result.genres
                    this.setState({
                        isLoaded: true,
                        items: test
                    });
                },
                
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        //console.log(items);
        let test = [];
        Object.keys(items).forEach(function (key, value) {
            test.push(items[key]);
        })
        // console.log(test);

        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else if (this.state.showGenre != false) {
            return (
                <div id="Albums" className="Content">
                    <h1 className="title">{this.state.currentGenre}</h1>
                    {test.map((key, value) =>
                        <div className="albumList" onClick={() => this.openAlbum(key['id'], key['cover_small'])}>
                            <img src={key['cover_small']}></img>
                            <figcaption>{key[2]}</figcaption>
                        </div>
                    )}

                </div>
            );
        } else if (this.state.showAlbum != false) {
            return (
                <div id="Tracks" className="Content">
                    <img src={this.state.imgAlbum} ></img>
                    {test.map((key, value) =>
                        <div className="albumList trackList">
                            <h2><i class="fas fa-music"></i> {key['name']}</h2>
                            <p>No: {key['track_no']}</p>
                            <audio controls>
                                <source src={key['mp3']} type="audio/mp3" />
                            </audio>
                        </div>
                    )}

                </div>
            );
        } else {
            return (
                <div id="Genres" className="Content">
                    {test.map((key, value) =>

                        <div className={"color" + key['id']} onClick={() => this.openGenre(key['id'], key['name'])}>
                            <a className="genre" href="#">
                                <img src={key['cover_small']}></img>
                                {key['name']}
                            </a>
                        </div>
                    )}

                </div>
            );
        }
    }
}
export default Genres;