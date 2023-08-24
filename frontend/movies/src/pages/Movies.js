
import React,{useState} from "react";
import MovieList from "../components/lists/Movies";
import { consume_service } from "../api/api";
import { URL_MOVIES_BASE } from "../api/constantes";



const Movies = () => {


    const [searchInput, setSearchInput] = useState("");
    const [pelis, setPelis] = useState([]);


    const handleChange = async(e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        // datos filtrados o no según corresponda
        let url = URL_MOVIES_BASE;
        if (e.target.value.length > 0) {
            url += `?title__contains=${e.target.value}`;  //  /?..
        }
        const response = await consume_service(url,'get','',{},false);
        setPelis(response.data);
    };

    React.useEffect(() => {
        const fetchData = async() => {
            const response = await consume_service(URL_MOVIES_BASE,'get','',{},false);
            setPelis(response.data);
        }
        fetchData();
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



