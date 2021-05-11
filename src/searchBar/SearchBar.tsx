import React, {Component} from "react";
import AsyncSelect, {ValueType} from "react-select"
import {MovieSearch} from "../models/MovieSearch";
import './SearchBar.css'
import MovieRenderer from "../movieRenderer/MovieRenderer";
import {SearchProps} from "../models/Props";

export default class SearchBar extends Component<{searchProps : SearchProps}>{
    state = {
        query : '',
        results : [],
        options : [],
        loading : false,
        selectedOption : {id : '', posterURL : ''},
    }
    searchQuery: any;

    // Style the options dropdown
    customStyles = {
        option: (provided: any) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: 'blue',
            padding: 10,
            textAlign: 'left',
            fontSize: 20,
            cursor : 'pointer'
        })
    }

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
    handleOnSelectedOption = (option: ValueType<{
        id: string; label: string;
        value: string; posterURL : string },
        false>) => {
        if (option  !== null){
            this.setState({selectedOption : {id : option.id, posterURL : option.posterURL}})
        }
    }

    // Used for exiting the movie card
    clearSelection = () => {
        this.setState({selectedOption : {id : '', posterURL : ''}});
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
                                        <img src={element.Poster} height="90px" width="60px" alt="" />
                                        <span className="dropdown-text">
                                            &nbsp;{element.Title}&nbsp;({element.Year})
                                        </span>
                                   </div>,
                            value: element.Title,
                            posterURL : element.Poster,
                            id: element.imdbID
                        }
                        movieOptionsArray.push(movieOption);
                    })
                    this.setState({results : jsonRes.Search,
                        options : movieOptionsArray,
                        loading : false})
                }
                // Failed query
                else{
                    this.setState({results : jsonRes.Search, options : [], loading : false})
                }
        })
    }

    render() {
        if (this.state.selectedOption.id === ''){
            this.props.searchProps.setLogoVisible(true);
            return (
                <div>
                    <form>
                        <AsyncSelect className="auto-complete"
                         placeholder="Movie title..."
                         ref={input => this.searchQuery = input}
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
                </div>
            )
        }
        else {
            this.props.searchProps.setLogoVisible(false);
            return (
                <MovieRenderer RendererProps={
                    {   movie:
                        // @ts-ignore
                            {id : this.state.selectedOption.id ,posterURL : this.state.selectedOption.posterURL},
                        exitFunction : this.clearSelection.bind(this),
                        nominateFunction : this.props.searchProps.setNominations,
                        nominations : this.props.searchProps.nominations
                    }
                }/>
            )
        }
    }
}
