import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewCard from "../cards/Review";


const Reviews  = (props) => {

    const reviews = props.reviews.map ( ( review) => {
        return <ReviewCard review={review}></ReviewCard>
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