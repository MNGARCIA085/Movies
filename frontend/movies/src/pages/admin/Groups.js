
import React from "react";
import GroupsTable from "../../components/datatables/Groups";
import { Link } from 'react-router-dom';

const AdminGroups = () => {

      return (
          <div className="ui container" style={{ marginTop: '10px' }}>
                
                
                <div class="col-md-8 md-offset-2">
                        <center><h2><font color='red'>ADMIN: GROUPS</font></h2></center>
                        <hr></hr>
                        <Link to="/admin/groups/upsert" className="btn btn-primary btn-sm">
                                Add
                        </Link>
                        <br></br> <br></br>
                        <GroupsTable/>
                </div>
                
                     
               
          </div>
      );
}

export default AdminGroups;



