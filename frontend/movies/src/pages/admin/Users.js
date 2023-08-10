
import React,{useState} from "react";
import UsersTable from "../../components/admin/Users/Users";


const AdminUsers = () => {

      return (
          <div className="ui container" style={{ marginTop: '10px' }}>
                <center><h2><font color='red'>ADMIN: USERS</font></h2></center>
                <hr></hr>
                <div class="row">
                    <div class="col-md-10">
                    <UsersTable/>
                    </div>
                </div>
          </div>
      );
}

export default AdminUsers;



