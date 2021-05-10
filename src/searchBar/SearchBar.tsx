import React, {Component} from "react";
import AsyncSelect, {ValueType} from "react-select"
import {MovieSearch} from "../models/MovieSearch";
import './SearchBar.css'
import MovieRenderer from "../movieRenderer/MovieRenderer";

export interface ChildProps{
    movieID : string,
    exitFunction : () => void
}

export default class SearchBar extends Component{
    state = {
        query : '',
        results : [],
        options : [],
        loading : false,
        selectedOption : ''
    }
    search: any;

    // Called when input field is used
    handleOnInputChange = (input : any) => {
        this.setState({query : input},
            // Don't call API for empty or short queries
            () => {
                if (this.state.query && this.state.query.length > 2){
                    this.GetAPISearchResults();
                }
                // Clear options if empty or short query
                else{
                    this.setState({options : []})
                }
            })
    }

    // Called when dropdown option is selected
    handleOnSelectedOption = (option: ValueType<{ ID: string; label: string; value: string },
        false>) => {
        if (option  !== null){
            this.setState({selectedOption : option.ID})
        }
    }

    clearSelection = () => {
        this.setState({selectedOption : ''});
        console.log(this.state.selectedOption)
    }

    // Query OMDB API with the input query
    GetAPISearchResults = () => {
        this.setState( {loading : true})
        fetch('https://www.omdbapi.com/?s=' + this.state.query + '&type=movie&apikey=71965067')
            .then(res => res.json()).then(jsonRes => {
                // Succesful query
                if (jsonRes.Response === "True"){
                    let movieOptionsArray: { label: JSX.Element; value: string; }[] = [];
                    // Map movie objects to options object
                    jsonRes.Search.forEach( (element: MovieSearch) => {
                        let movieOption = {
                            label: <div>
                                        <img src={element.Poster} height="90px" width="60px" alt=""/>
                                        &nbsp;{element.Title}&nbsp;({element.Year})
                                    </div>,
                            value: element.Title,
                            ID: element.imdbID
                        }
                        movieOptionsArray.push(movieOption);
                    })
                    this.setState({results : jsonRes.Search, options : movieOptionsArray, loading : false})
                }
                // Failed query
                else{
                    this.setState({results : jsonRes.Search, options : [], loading : false})
                }
        })
    }

    // Style the options dropdown
    customStyles = {
        option: (provided: any) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: 'blue',
            padding: 10,
            textAlign: 'left',
            fontSize: 20
        })
    }

    render() {
        if (this.state.selectedOption === ''){
            return (
                <form>
                    <AsyncSelect className="auto-complete"
                                 placeholder="Movie title..."
                                 ref={input => this.search = input}
                                 onInputChange={(input) => this.handleOnInputChange(input)}
                                 onChange={(selectedOption) => {
                                     this.handleOnSelectedOption(selectedOption)
                                 }}
                                 isLoading={this.state.loading}
                                 options={this.state.options}
                                 autoFocus={true}
                                 components={{DropdownIndicator:() => null, IndicatorSeparator:() => null}}
                                 styles={this.customStyles}
                    />
                </form>
            )
        }
        else {
            return (
                <MovieRenderer props={
                    {movieID: this.state.selectedOption,
                        exitFunction : this.clearSelection.bind(this)
                    }
                }/>
            )
        }
    }
}