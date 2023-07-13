import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";




const MovieCard = (props) => {

        const movie = props.movie;

        return (

            <div>
                <div class="card col-md-6" key={movie.id}>
                    <div class="content">
                        <div class="header"><center><h3>{movie.title}</h3></center><hr></hr></div>
                        <div class="description"> 
                            <center> <img src={movie.image_link} alt='Description' width="100px" height="80px"></img> 
                                </center>  
                        </div>
                        <div class="description">
                            <br></br>
                            <b>Description:</b> : {movie.description} <br></br>
                        </div>
                        <hr></hr>
                        <center>
                            <i class="add icon"  style={{color:'grey'}}></i>
                            <Link
                                style={{ textDecoration: "none" }}
                                to={`${movie.id}`}
                                key={movie.id}
                                className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark">
                                    Details
                            </Link> 
                        </center>           
                </div>
            </div>

            <br></br>


            </div>

        )


}

export default MovieCard;