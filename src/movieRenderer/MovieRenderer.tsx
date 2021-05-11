import React, {Component} from "react";
import spinner from "./spinner.gif"
import './MovieRenderer.css'
import {MovieRendererProps} from "../models/Props";

export default class MovieRenderer extends Component<{ RendererProps : MovieRendererProps }> {
    state = {
        loading : true,
        shownMovie : this.props.RendererProps.movie,
        exitFunction : this.props.RendererProps.exitFunction,
        nominateFunction: this.props.RendererProps.nominateFunction,
        nominatedMovies : this.props.RendererProps.nominations,
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
        this.GetAPISearchResults(this.state.shownMovie.id);
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

    nominateTitle(){
        let nomsCopy = this.state.nominatedMovies;
        nomsCopy.push(this.state.shownMovie);
        this.state.nominateFunction(nomsCopy);
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
            if (this.state.nominatedMovies.length < 5
                && !this.state.nominatedMovies.find( mov => mov.id === this.state.shownMovie.id)) {
                nomButton = <button className="button" onClick={() => {
                    this.nominateTitle();
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
