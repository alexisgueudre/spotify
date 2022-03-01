import React, { Component } from 'react'

import{
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import logo from './logo.png';

import Accueil from './Accueil.js';

import Recherche from './Recherche.js';

import Genres from './Genres.js';

import Albums from './Albums.js';

import Artistes from './Artistes.js';

export default function App() {
    return (
        <Router>
            <div id="Page">
                <nav id="Navbar">
                <h1><img src={logo} draggable="false" id="logo" width="50" height="50" alt="logo spotify" /> Spotify</h1>
                <ul>
                    <li>
                    <Link to="/"><i className="fas fa-home"></i> Accueil</Link>
                    </li>
                    <li>
                    <Link to="/Rechercher"><i className="fas fa-search"></i> Rechercher</Link>
                    </li>
                    <li>
                    <Link to="/Genres"><i className="fas fa-th-list"></i> Genres</Link>
                    </li>
                    <li>
                    <Link to="/Albums"><i className="fas fa-compact-disc"></i> Albums</Link>
                    </li>
                    <li>
                    <Link to="/Artistes"><i className="fas fa-user-friends"></i> Artistes</Link>
                    </li>
                </ul>
                </nav>

                <Switch>
                <Route path="/Artistes">
                    <Artistes />
                </Route>
                <Route path="/Albums">
                    <Albums />
                </Route>
                <Route path="/Genres">
                    <Genres />
                </Route>
                <Route path="/Rechercher">
                    <Recherche />
                </Route>
                <Route path="/">
                    <Accueil />
                </Route>
                </Switch>
            </div>
        </Router>
    );
}
