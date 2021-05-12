import {Component, ReactElement} from "react";
import './NominationDisplay.css'
import {NominationDisplayProps} from "../models/Props";

export default class NominationDisplay extends Component<
    {NomsProps : NominationDisplayProps}>{
    state = {
        nominations : this.props.NomsProps.nominations,
        selectMovie : this.props.NomsProps.selectFunction
    }

    showMovieCard(id: string){
        this.state.selectMovie(id);
    }

    render(){
        if (this.state.nominations.length !== 0){
            return(
                <div className="nom-container">
                    {this.state.nominations.map( (mov ) : ReactElement =>
                    {
                        return (
                            <img src={mov.posterURL} className="poster" alt={''}
                            onClick={() => this.showMovieCard(mov.id)}/>
                        );
                    })}
                </div>
            )
        }
        else{
            return(<div className="filler">&nbsp;</div>);
        }
    }
}
