import React, {ReactElement, useState} from 'react';
import './App.css';
import SearchBar from "./searchBar/SearchBar"
import NominationDisplay from "./nominationDisplay/NominationDisplay";
import logo from "./logo.png"

function App() {
    const [nominations, setNominations] = useState([]);
    const [logoDisplayed, setMovieDisplayed] = useState(true);

    let logoDisplay : ReactElement = <img className="logo" src={logo} alt={''}/>;
    if (!logoDisplayed){
        logoDisplay = <div className="break"/>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="break"/>
                {logoDisplay}
                <div className="break"/>
                <SearchBar searchProps={
                    {   nominations : nominations,
                        setNominations : setNominations,
                        setLogoVisible : setMovieDisplayed                    }
                }/>
                <NominationDisplay nominations={nominations}/>
            </header>
        </div>
    );
}

export default App;
