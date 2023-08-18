import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";




const MovieCard = (props) => {

        const movie = props.movie;

        return (
            <div>
                <div class="row">
                    <div class="col-md-12">
                        <h3><center><font color='black'>{movie.title}</font></center></h3>
                        <center>
                            <Link
                                style={{ textDecoration: "none" }}
                                to={`${movie.id}`}
                                key={movie.id}
                                className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark">
                                    <img src={movie.image_link} alt='Description' 
                                        width="240px" height="200px"></img> 
                            </Link> 
                        </center>
                    </div>
                </div>
                <br></br>
            </div>
        )

}

export default MovieCard;