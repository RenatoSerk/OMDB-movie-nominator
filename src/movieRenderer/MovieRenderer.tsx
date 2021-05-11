import React, {Component} from "react";
import spinner from "./spinner.gif"
import './MovieRenderer.css'
import {ChildProps} from "../searchBar/SearchBar";

export default class MovieRenderer extends Component<{ props : ChildProps }> {
    state = {
        loading : true,
        movieID : this.props.props.movieID,
        exitFunction : this.props.props.exitFunction,
        nominateFunction: this.props.props.nominateFunction,
        nominatedIDs : this.props.props.nominatedTitles,
        movie : {
            Title: '',
            Poster: '',
            Director: '',
            Actors: '',
            Released: '',
            imdbRating: '',
            Plot: '',
            Genre: ''
        }
    }

    componentDidMount() {
        this.GetAPISearchResults(this.state.movieID);
    }

    GetAPISearchResults = (id : string) => {
        fetch('https://www.omdbapi.com/?i=' + id + '&apikey=71965067')
            .then(res => res.json()).then(jsonRes => {
            // Succesful query
            if (jsonRes.Response === "True"){
                this.setState({movie : jsonRes, loading: false})
            }
            // Failed query, get us out of here!
            else{
                console.error("Movie search failed")
                this.state.exitFunction();
            }
        })
    }

    render() {
        const {
            Title, Poster, Director, Released,
            imdbRating, Plot, Genre, Actors
        } = this.state.movie;

        if (this.state.loading) {
            return (
                <div>
                    <img src={spinner} height="200px" width="200px" alt="LOADING"/>
                </div>
            )
        }
        else {
            let nomButton : React.ReactElement;

            // Title has not been nominated already
            if (this.state.nominatedIDs.indexOf(this.state.movieID) === -1) {
                nomButton = <button className="button" onClick={() => {
                    this.state.nominateFunction(this.state.movieID);
                    this.state.exitFunction();
                }}> Nominate! </button>
            }
            // Title is already nominated
            else {
                nomButton = <span/>
            }

            return (
                <div className="Card">
                    <div className="poster-container">
                        <img className="poster-bg"
                             src={Poster} alt={''}/>
                    </div>
                    <div className="movie-info">
                        <h2>{Title}</h2>
                        <h1>Release Date: {Released}</h1>
                        <h4>Director: {Director}</h4>
                        <h4>Actors: {Actors}</h4>
                        <h4>IMDB Rating: {imdbRating} / 10</h4>
                        <p>{Plot}</p>
                        <div className="tags-container">
                            {Genre && Genre.split(', ').map((gen: any) => <span>{gen}</span>)}
                        </div>
                        <div className="button-container">
                            &nbsp;&nbsp;
                            <button className="button"
                                    onClick={this.state.exitFunction}>Back
                            </button>
                            &nbsp;&nbsp;
                            {nomButton}
                            &nbsp;&nbsp;
                        </div>
                    </div>
                </div>
            );
        }
    }
}
