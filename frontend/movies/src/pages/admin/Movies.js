
import axios from "axios";
import React,{useState} from "react";
import MoviesTable from "../../components/admin/Movies";
import MovieFilterForm from "../../components/admin/MovieFilterForm";

const AdminMovies = () => {

      return (
          <div className="ui container" style={{ marginTop: '10px' }}>

                <center><h2><font color='red'>ADMIN: MOVIES</font></h2></center>

                <hr></hr>


               
                
                <div class="row">
                    <div class="col-md-10">
                    <MoviesTable/>
                    </div>
                </div>

                

                
          </div>
      );
}

export default AdminMovies;



