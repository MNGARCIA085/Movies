
import React from "react";
import GenresTable from "../../components/datatables/Genres";
import { Link } from 'react-router-dom';

const AdminGenres = () => {

      return (
          <div className="ui container" style={{ marginTop: '10px' }}>
                
                
                <div class="col-md-8 md-offset-2">
                        <center><h2><font color='red'>ADMIN: GENRES</font></h2></center>
                        <hr></hr>
                        <Link to="/admin/genres/upsert" className="btn btn-primary btn-sm">
                                Add
                        </Link>
                        <br></br> <br></br>
                        <GenresTable/>
                </div>
                
                     
               
          </div>
      );
}

export default AdminGenres;



