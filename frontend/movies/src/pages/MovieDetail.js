
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import React, {useState} from 'react';
import axios from "axios";
import Reviews from '../components/Reviews';

const MovieDetail = () => {

        const [data, setData] = useState([]);

        const [rev, setRev] = useState([]);

        let { id } = useParams();

        const baseURL = 'http://127.0.0.1:8000/movies/' + id;

        
        React.useEffect(() => {
            axios.get(baseURL).then((response) => {
                setData(response.data);
                setRev(response.data.reviews);
            });
        }, []);




        
    
        return (

            <div>



                <div class="row">
                    <div class="col-md-12 col-md-offset-0">

                        <h3><font color='red'><center>{data.title}</center></font></h3>

                        <hr></hr>

                        <center>
                                <img src={data.image_link} alt='Description' 
                                        width="440px" height="400px"></img> 
                                <br></br>
                                <br></br>
                                {data.description}


                                <br></br>
                                <br></br>
                                <b>REVIEWS</b> 
                                <Reviews reviews={rev}/>

                        </center>



                        



                    </div>
                </div>


                
                
                

                

                


                


                

                


                


            </div>

        )


}

export default MovieDetail;