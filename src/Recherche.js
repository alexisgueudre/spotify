import React, { Component } from 'react'

export class Recherche extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            value: '',
            items: [],
            showResult: false,
            showAlbum: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        fetch("http://localhost/WAC/W1%20-%20Projets%20Web/W-WEB-090-PAR-1-1-spotify-yanis.benhagouga/src/api.php", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: "search=" + this.state.value
        })
            .then(res => res.json())
            .then(
                (result) => {
                    let test = result
                    this.setState({
                        isLoaded: true,
                        items: test,
                        showResult: true,
                    });
                },
            
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        event.preventDefault();
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
                        showResult: false,
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
        } else if (this.state.showResult != false) {
            return (
                <div className="Content">
                    <form onSubmit={this.handleSubmit} className="ContentSearch" id="Recherche">
                        <input className="searchInput" type="text" id="search" name="search" placeholder="Albums, Artistes, Tracks..." onChange={this.handleChange} />
                        <button type="submit" className="searchButton"><i class="fas fa-search"></i></button>
                    </form>
                    <div id="Result" className="Content">
                        {test.map((key, value) =>
                            <div className="albumList" onClick={() => this.openAlbum(key['id'], key['cover_small'])}>
                                <img src={key['cover_small']}></img>
                                <figcaption>{key['name']}</figcaption>
                            </div>
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="Content">
                    <form onSubmit={this.handleSubmit} className="ContentSearch" id="Recherche">
                        <input className="searchInput" type="text" id="search" name="search" placeholder="Albums, Artistes, Tracks..." onChange={this.handleChange} />
                        <button type="submit" className="searchButton"><i class="fas fa-search"></i></button>
                    </form>
                </div>
            )
        }

    }
}

export default Recherche