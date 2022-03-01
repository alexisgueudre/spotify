import React from 'react'

class Artistes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            showArtist: false,
            imgArtist: null,
            descriptionArtist: null,
            bioArtist: null,
            nameArtist: null,
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
                        showArtist: false,
                        imgAlbum: img
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

    openArtist(id, name, bio, description, img) {
        fetch("http://localhost/WAC/W1%20-%20Projets%20Web/W-WEB-090-PAR-1-1-spotify-yanis.benhagouga/src/api.php", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "artist_id=" + id
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let test = result
                    this.setState({
                        isLoaded: true,
                        items: test,
                        showArtist: true,
                        imgArtist: img,
                        nameArtist: name,
                        bioArtist: bio,
                        descriptionArtist: description,
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
                    let test = result.artists
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
        //console.log(test);



        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else if (this.state.showArtist != false) {
            return (
                <div id="Artists" className="Content">
                    <img src={this.state.imgArtist} className="photoArtist" ></img>
                    <h1 className="title">{this.state.nameArtist}</h1>
                    <p className="text" > Bio: {this.state.bioArtist}</p>
                    <p className="text" > Description: { this.state.descriptionArtist}</p>
            {
                test.map((key, value) =>
                    <div className="albumList" onClick={() => this.openAlbum(key['id'], key['cover_small'])}>
                        <img src={key['cover_small']}></img>
                        <figcaption>{key['name']}</figcaption>
                    </div>
                )
            }

                </div >
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
                <div id="Artists" className="Content">
                    {test.map((key, value) =>
                        <div className="artistList">
                            <div className="artists" onClick={() => this.openArtist(key['id'], key['name'], key['bio'], key['description'], key['photo'])}>
                                <img width="200px" height="200px" src={key['photo']}></img>
                                <figcaption>{key['name']}</figcaption>
                            </div>
                        </div>
                    )}

                </div>
            );
        }
    }
}
export default Artistes;