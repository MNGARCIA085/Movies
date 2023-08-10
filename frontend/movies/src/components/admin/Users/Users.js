import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { Table, Button } from 'react-bootstrap';

import { URL_USERS_BASE } from '../../../api/constantes';

const UsersTable = () => {
  const [data, setData] = useState([]);
  



  const [limit, setLimit] = useState(10);

  const [count,setCount] = useState(0);


  const fetchData = async (usernameFilter='',nameFilter='',emailFilter='') => {


    console.log(usernameFilter);

    


    // obtengo los datos de los posibles filtros
    let query = `?limit=${limit}`; // dsp. agregar page
    if (usernameFilter !== ''){
        query += `&username__contains=${usernameFilter}`;
    }
    if (nameFilter !== ''){
        query += `&first_name__contains=${nameFilter}`;
        query += `&last_name__contains=${nameFilter}`;
    }
    if (emailFilter !== ''){
        query += `&email__contains=${emailFilter}`;
    }

    const response = await axios.get(`${URL_USERS_BASE}?${query}`);
    setData(response.data.data);

    setCount(response.data.count);


  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    //setData(prevData => prevData.filter(item => item.id !== id));
    // mayb delete and re-fecth data
    console.log('bla');
    console.log(id);


    //setData(prevData => prevData.map(item => console.log(item)));


    setData(prevData => prevData.filter(item => item.id !== id));
    // fetchData con la nueva query; pero trae todo de vuelta (lo paginado)
  };




  const [usernameFilter, setUsernameFilter] = useState('');
  const handleUsernameFilterChange = (event) => {
    //event.preventDefault();
    setUsernameFilter(event.target.value);
    fetchData(event.target.value,nameFilter,emailFilter);
  };

  const [nameFilter, setNameFilter] = useState('');
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
    fetchData(usernameFilter,event.target.value,emailFilter);
  };

  const [emailFilter, setEmailFilter] = useState('');
  const handleEmailFilterChange = (event) => {
    setEmailFilter(event.target.value);
    fetchData(usernameFilter,nameFilter,event.target.value);
  };

  



  
   

  return (
    <div>

    {count} <br></br>


      <Table bordered hover>


      
        <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>



        <tfoot>
          <tr>
            <td></td>
            <td>
                <input
                    type="text"
                    class="form-control"
                    value={usernameFilter}
                    onChange={handleUsernameFilterChange}
                    placeholder="Type something..."
                />
            </td>

            <td>
            <input
                    type="text"
                    class="form-control"
                    value={nameFilter}
                    onChange={handleNameFilterChange}
                    placeholder="Type something..."
                />
            </td>


            <td>
            <input
                    type="text"
                    class="form-control"
                    value={emailFilter}
                    onChange={handleEmailFilterChange}
                    placeholder="Type something..."
                />
            </td>
            
            <td></td>
          </tr>
        </tfoot>


        <tbody>
          {data.map((row) => {
            return (
              <tr>
                <td> {row.id}</td>
                <td> {row.username}</td>
                <td> {row.first_name} {row.last_name}</td>
                <td> {row.email}</td>
                <td>
                  <EditButton id={row.id} />
                  


                  <button class="btn btn-danger" onClick={() => handleDelete(row.id)}>Click Me</button>

                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersTable;
