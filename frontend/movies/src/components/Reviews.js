import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieCard from "./MovieCard";
import MovieImage from "./MovieImage";
import Review from "./Review";

const Reviews  = (props) => {

    const reviews = props.reviews.map ( ( review) => {
        return <Review review={review}></Review>
    })
    
    return (
        <div class="row">
            <div class="col-md-12 offset-md-0">
                <div >
                    {reviews} 
                </div>
            </div>
        </div>
    )

}

export default Reviews;