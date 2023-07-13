
import axios from "axios";
import React,{useState} from "react";
import MovieList from "../components/MovieList";

const Movies = () => {

      const baseURL = 'http://127.0.0.1:8000/movies/';
      //const [pelis, setPelis] = React.useState(null);


      /**
      


      if (!pelis) return null;
      */



    const [searchInput, setSearchInput] = useState("");
    const [pelis, setPelis] = useState([]);


    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        if (e.target.value.length > 0) {
            const url = baseURL + '?title__contains=' + e.target.value;
            axios.get(url).then((response) => {
                setPelis(response.data);
            });
        }
        else{
            axios.get(baseURL).then((response) => {
                setPelis(response.data);
            });
        }
    };

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPelis(response.data);
        });
    }, []);




      return (
          <div className="ui container" style={{ marginTop: '10px' }}>

                <center><h2><font color='red'>LIST OF MOVIES</font></h2></center>

                <hr></hr>
                <br></br>


                <div class="row">
                    <div class="col-md-2 offset-md-8">
                        <input
                            class="form-control"
                            type="text"
                            placeholder="Search title"
                            onChange={handleChange}
                            value={searchInput} />
                    </div>
                </div>


                  <MovieList movies={pelis}/>
          </div>
      );
}

export default Movies;



