import { createContext,useEffect,useState} from "react";
import React from 'react'

export const MovieContext = createContext();



export default function MovieContextProvider(props) {

    const [movies, setMovies] = useState([]);
    let value = {movies,setMovies};

  return (
    <MovieContext.Provider value={value}>
        {props.children}
    </MovieContext.Provider>
  )
}
