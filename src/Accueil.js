import React from 'react';

class Accueil extends React.Component {
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
        // console.log(items);
        let test = [];
        Object.keys(items).forEach(function (key, value) {
            test.push(items[key]);
        })
        // console.log(test);
        let a = Math.floor(Math.random() * Math.floor(test.length));
        let b = Math.floor(Math.random() * Math.floor(test.length));
        let c = Math.floor(Math.random() * Math.floor(test.length));
        let d = Math.floor(Math.random() * Math.floor(test.length));
        let e = Math.floor(Math.random() * Math.floor(test.length));
        let f = Math.floor(Math.random() * Math.floor(test.length));
        let g = Math.floor(Math.random() * Math.floor(test.length));
        let h = Math.floor(Math.random() * Math.floor(test.length));
        let i = Math.floor(Math.random() * Math.floor(test.length));
        let j = Math.floor(Math.random() * Math.floor(test.length));

        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else if (this.state.showAlbum != false) {
            // console.log(this.state.imgAlbum)
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
                    <div className="albumList" id={test[a]['id']} onClick={() => this.openAlbum(test[a]['id'], test[a]['cover_small'])}>
                        <img src={test[a]['cover_small']}></img>
                        <figcaption>{test[a]['name']}</figcaption>
                    </div>
                    <div className="albumList" id={test[b]['id']} onClick={() => this.openAlbum(test[b]['id'], test[b]['cover_small'])}>
                        <img src={test[b]['cover_small']}></img>
                        <figcaption>{test[b]['name']}</figcaption>
                    </div>
                    <div className="albumList" id={test[c]['id']} onClick={() => this.openAlbum(test[c]['id'], test[c]['cover_small'])}>
                        <img src={test[c]['cover_small']}></img>
                        <figcaption>{test[c]['name']}</figcaption>
                    </div>
                    <div className="albumList" id={test[d]['id']} onClick={() => this.openAlbum(test[d]['id'], test[d]['cover_small'])}>
                        <img src={test[d]['cover_small']}></img>
                        <figcaption>{test[d]['name']}</figcaption>
                    </div>
                    <div className="albumList" id={test[e]['id']} onClick={() => this.openAlbum(test[e]['id'], test[e]['cover_small'])}>
                        <img src={test[e]['cover_small']}></img>
                        <figcaption>{test[e]['name']}</figcaption>
                    </div>
                    <div className="albumList" id={test[f]['id']} onClick={() => this.openAlbum(test[f]['id'], test[f]['cover_small'])}>
                        <img src={test[f]['cover_small']}></img>
                        <figcaption>{test[f]['name']}</figcaption>
                    </div>
                    <div className="albumList" id={test[g]['id']} onClick={() => this.openAlbum(test[g]['id'], test[g]['cover_small'])}>
                        <img src={test[g]['cover_small']}></img>
                        <figcaption>{test[g]['name']}</figcaption>
                    </div>
                    <div className="albumList" id={test[h]['id']} onClick={() => this.openAlbum(test[h]['id'], test[h]['cover_small'])}>
                        <img src={test[h]['cover_small']}></img>
                        <figcaption>{test[h]['name']}</figcaption>
                    </div>
                    <div className="albumList" id={test[i]['id']} onClick={() => this.openAlbum(test[i]['id'], test[i]['cover_small'])}>
                        <img src={test[i]['cover_small']}></img>
                        <figcaption>{test[i]['name']}</figcaption>
                    </div>
                    <div className="albumList" id={test[j]['id']} onClick={() => this.openAlbum(test[j]['id'], test[j]['cover_small'])}>
                        <img src={test[j]['cover_small']}></img>
                        <figcaption>{test[j]['name']}</figcaption>
                    </div>


                </div>
            );
        }
    }
}
export default Accueil;