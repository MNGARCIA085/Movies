
import React,{useState} from "react";
import MoviesTable from "../../components/datatables/Movies";
import { Link } from 'react-router-dom';

const AdminMovies = () => {

      return (
          <div className="ui container" style={{ marginTop: '10px' }}>
                <center><h2><font color='red'>ADMIN: MOVIES</font></h2></center>
                <hr></hr>
                <div class="row">
                    <div class="col-md-12">


                    <Link to="/admin/movies/add" className="btn btn-primary btn-sm">
                            Add
                    </Link>

                    <br></br> <br></br>


                    <MoviesTable/>

                    
                    
                    
                    
                    </div>
                </div>
          </div>
      );
}

export default AdminMovies;



