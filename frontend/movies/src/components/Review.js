import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Review = (props) => {

        const review = props.review;

        return (
            <div>
                <div class="row">
                    <div class="col-md-12">


                        <div class="row">
                            <div class="col-md-12">
                                <b>{review.user.username} : </b> {review.score}
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                {review.date}
                            </div>
                        </div>

                        <br></br>

                        <div class="row">
                            <div class="col-md-12">
                                {review.description}
                            </div>
                        </div>

                        <hr></hr>

                        
                    </div>
                </div>
                <br></br>
            </div>
        )

}

export default Review;