import React, {Component} from "react";
import spinner from "./spinner.gif"
import './MovieRenderer.css'
import {ChildProps} from "../searchBar/SearchBar";

export default class MovieRenderer extends Component<{ props : ChildProps }> {
    state = {
        movieID : this.props.props.movieID,
        exitFunction : this.props.props.exitFunction,
        loading : true,
        movie : {
            Title: undefined,
            Poster: undefined,
            Director: undefined,
            Actors: undefined,
            Released: undefined,
            imdbRating: undefined,
            Plot: undefined,
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
            // Failed query
            else{
                // do something here
                // this.setState()
            }
        })
    }

    render() {
        const {
            Title, Poster, Director, Released,
            imdbRating, Plot, Genre, Actors
        } = this.state.movie;
        if (this.state.loading){
            return(
                <div>
                    <img src={spinner} height="200px" width="200px" alt="LOADING"/>
                </div>
            )
        }
        else{
            return(
                <div className="Card">
                    <div className="poster-container">
                        <div className="poster-bg"
                             style={{ backgroundImage : Poster}}/>
                    </div>
                    <div className="movie-info">
                        <h2>{Title}</h2>
                        <h1>Release Date: {Released}</h1>
                        <h4>Director: {Director}</h4>
                        <h4>Actors: {Actors}</h4>
                        <h4>IMDB Rating: {imdbRating} / 10</h4>
                        <p>{Plot}</p>
                        <div className="tags-container">
                            {Genre && Genre.split(', ').map((gen: any ) => <span>{gen}</span>)}
                        </div>
                        <div>
                            &nbsp;&nbsp;
                            <button className="card-button"
                                    onClick={this.state.exitFunction}>Back</button>
                            &nbsp;&nbsp;
                            <button className="card-button"
                                    onClick={() => {}}>Nominate!</button>
                            &nbsp;&nbsp;
                        </div>
                    </div>
                </div>
            );
        }
    }
}
