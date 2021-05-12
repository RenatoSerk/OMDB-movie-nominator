import React, {ReactElement, useState} from 'react';
import './App.css';
import SearchBar from "./searchBar/SearchBar"
import NominationDisplay from "./nominationDisplay/NominationDisplay";
import logo from "./logo.png"
import MovieRenderer from "./movieRenderer/MovieRenderer";

function App() {
    const [nominations, setNominations] = useState([]);
    const [logoDisplayed, setMovieDisplayed] = useState(true);
    const [selectedNomMov, setSelectedNomMov] = useState('');

    let logoDisplay : ReactElement = <img className="logo" src={logo} alt={''}/>;
    let banner : ReactElement = <></>;
    let nominationsView : ReactElement =
        <NominationDisplay NomsProps={{
            nominations : nominations,
            selectFunction : setSelectedNomMov
        }}/>;

    // Check if the logo should be displayed
    if (!logoDisplayed){
        nominationsView = <div className="break"/>;
        logoDisplay = <div className="break"/>;
    }

    // Display banner if there are 5 nominations
    if (nominations.length > 4) {
        banner = <div className="banner">Nominations selected!</div>
    }

    // Render the movie that was selected from the nominations bar
    if (selectedNomMov){
        return (
            <div className="App">
                <header className="App-header">
                    <MovieRenderer RendererProps={
                        {   movie : {id : selectedNomMov, posterURL : ''},
                            exitFunction : () => setSelectedNomMov(''),
                            nominateFunction : setNominations,
                            nominations : nominations
                        }
                    }/>
                </header>
            </div>
        );
    }
    else{
        return (
            <div className="App">
                <header className="App-header">
                    {banner}
                    <div className="break"/>
                    {logoDisplay}
                    <div className="break"/>
                    <SearchBar searchProps={
                        {   nominations : nominations,
                            setNominations : setNominations,
                            setLogoVisible : setMovieDisplayed                    }
                    }/>
                    {nominationsView}
                </header>
            </div>
        );
    }
}

export default App;
