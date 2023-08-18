import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const ReviewCard = (props) => {

    

        const review = props.review;


        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour:'2-digit', minute:'2-digit' };
        const dateObject = new Date(review.date);
        const formattedDate = dateObject.toLocaleDateString('es-ES', options);




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
                                {formattedDate}
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

export default ReviewCard;