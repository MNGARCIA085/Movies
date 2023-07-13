import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Review = (props) => {

        const review = props.review;

        return (
            <div>
                <div class="row">
                    <div class="col-md-12">
                        {review.description}
                        <br></br>
                        {review.user.username}
                        {review.score}
                    </div>
                </div>
                <br></br>
            </div>
        )

}

export default Review;