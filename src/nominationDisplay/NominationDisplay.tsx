import {Component, ReactElement} from "react";
import './NominationDisplay.css'

export default class NominationDisplay extends Component
    <{nominations : {id : string, posterURL : string}[]}>{
    state = {
        nominations : this.props.nominations
    }

    render(){
        console.log(this.state.nominations);
        if (this.state.nominations.length !== 0){
            return(
                <div className="nom-container">
                    {this.state.nominations.map( (mov ) : ReactElement =>
                    {
                        return (
                            <img src={mov.posterURL} className="poster" alt={''}/>
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
