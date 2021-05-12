import {Dispatch} from "react";

export interface SearchProps{
    nominations : Movie[],
    setNominations : Dispatch<any>
    setLogoVisible : Dispatch<any>
}

export interface MovieRendererProps {
    movie : Movie,
    exitFunction : () => void
    nominateFunction : Dispatch<any>
    nominations : Movie[]
}

export interface NominationDisplayProps{
    nominations : Movie[],
    selectFunction : Dispatch<any>
}

interface Movie {
    id : string,
    posterURL : string
}
