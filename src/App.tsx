import React, {ReactElement, useState} from 'react';
import './App.css';
import SearchBar from "./searchBar/SearchBar"
import NominationDisplay from "./nominationDisplay/NominationDisplay";
import logo from "./logo.png"

function App() {
    const [nominations, setNominations] = useState([]);
    const [logoDisplayed, setMovieDisplayed] = useState(true);

    let logoDisplay : ReactElement = <img className="logo" src={logo} alt={''}/>;
    let nominationsView : ReactElement = <NominationDisplay nominations={nominations}/>
    let ld : ReactElement = <></>
    // Check if the logo should be displayed
    if (!logoDisplayed){
        nominationsView = <div className="break"/>;
        logoDisplay = <div className="break"/>;
    }

    // Display banner if there are 5 nominations
    if (nominations.length > 4){
        ld = <div className="banner">Nominations selected!</div>
    }

    return (
        <div className="App">
            <body className="App-header">
                {ld}
                <div className="break"/>
                {logoDisplay}
                <div className="break"/>
                <SearchBar searchProps={
                    {   nominations : nominations,
                        setNominations : setNominations,
                        setLogoVisible : setMovieDisplayed                    }
                }/>
                {nominationsView}
            </body>
        </div>
    );
}

export default App;
