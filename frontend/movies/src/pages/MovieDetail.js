
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";




const MovieDetail = () => {

        const movie = 'dsfds';

        let { id } = useParams();

        // obtener datos del WS; movie con sus reviews




        return (

            <div>
                {movie}


                ADD review (score, desc.)


            </div>

        )


}

export default MovieDetail;