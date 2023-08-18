import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieCard from "../cards/MovieCard";


const MovieList = (props) => {

    const movies = props.movies.map ( ( movie) => {
        return <MovieCard movie={movie}/>
    })
    
    return (
        <div class="row">
            <div class="col-md-12 offset-md-0">
                <div >
                    {movies} 
                </div>
            </div>
        </div>
    )

}

export default MovieList;


