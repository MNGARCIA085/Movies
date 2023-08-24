import React, { useState, useEffect } from 'react';
import { consume_service } from '../../api/api';
import { URL_USERS_BASE } from '../../api/constantes';
import { useParams } from "react-router-dom";



const UserDetail = () => {

    let { id } = useParams();

    // general data
    const [data,setData] = useState('');

    // groupd
    const [groups,setGroups] = useState([]);


    // obtengo los datos
    React.useEffect(() => {
        const fetchData = async() => {
            const response = await consume_service(`${URL_USERS_BASE}${id}`,'get','',{},false);
            setData(response.data);
            setGroups(response.data.groups);

            console.log(groups);
        }
        fetchData();
    }, []);



    return (
  
        <div class="col-md-4 offset-4">
            <h3><font color='orange'><center>USER</center></font></h3>
            <hr></hr>

                <b>Name: </b> {data.first_name} {data.last_name} <br></br> <br></br>
                <b>Username:</b> {data.username} <br></br> <br></br>
                <b>Email: </b> <a href="mailto:{data.email}">{data.email}</a> <br></br> <br></br>
                <b>Status: </b> 
                        {
                            data.is_active === true ?
                                'Active' :
                                'Inactive'
                        }
                
                         <br></br> <br></br>
                <b>Is superuser:</b> 
                        {
                            data.is_superuser === true ?
                                'True' :
                                'False'
                        }
                        <br></br> <br></br>
                <b>Groups: </b>
                    {groups.map(item => (
                            <div class="offset-1">{item.description}</div>
                    ))}
        </div>
    
  );
};

export default UserDetail;
