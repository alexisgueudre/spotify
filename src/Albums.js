import React from 'react'

class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
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

    componentDidMount() {
        fetch("http://localhost/WAC/W1%20-%20Projets%20Web/W-WEB-090-PAR-1-1-spotify-yanis.benhagouga/src/api.php")
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result);
                    let test = result.albums
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
                <div id="Albums" className="Content">
                    {test.map((key, value) =>
                        <div className="albumList" id={key['id']} onClick={() => this.openAlbum(key['id'], key['cover_small'])}>
                            {/* <a className="album" href="#"> */}
                            <img src={key['cover_small']}></img>
                            <figcaption>{key['name']}</figcaption>
                            {/* </a> */}
                        </div>
                    )}

                </div>
            );
        }
    }
}
export default Albums;