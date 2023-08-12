import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { useNavigate,Link } from 'react-router-dom';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import { Table, Button } from 'react-bootstrap';
import { URL_USERS_BASE } from '../../../api/constantes';
import { consume_service } from '../../../api/api';
import './MyComponent.css';






const UsersTable = () => {


  
  
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  
  
  const [count,setCount] = useState(0);



  // función que recupera los datos 
  const fetchData = async (limit=10,usernameFilter='',nameFilter='',emailFilter='') => {

    // obtengo los datos de los posibles filtros
    let query = `?limit=${limit}`; // dsp. agregar page
    if (usernameFilter !== ''){
        query += `&username__contains=${usernameFilter}`;
    }
    if (nameFilter !== ''){
        query += `&last_name__contains=${nameFilter}`;
    }
    if (emailFilter !== ''){
        query += `&email__contains=${emailFilter}`;
    }

    const response = await axios.get(`${URL_USERS_BASE}${query}`);
    setData(response.data.data);


    // cant. de registros
    setCount(response.data.count);


  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleState = async(id) => {
    //setData(prevData => prevData.filter(item => item.id !== id)); de borrar lo hace bien
    const confirmacion = window.confirm("Are you sure?");
          if (confirmacion) {            
            try {
              const jwtToken = localStorage.getItem('access_token');
              const response = await consume_service(`${URL_USERS_BASE}/changestate/${id}`,'patch',
                                      '',{},false);
              // recargo
              fetchData(limit,usernameFilter,nameFilter,emailFilter);
            } catch (error) {
              console.error("Error al eliminar el elemento:", error);
            }
          }
  };


  //
  const handleDetail = async(id) => {
    navigate(`/admin/users/${id}`, { replace: true });
  };

  //
  const handleEdit = async(id) => {
    navigate(`/admin/users/edit/${id}`, { replace: true });
  };


  // page
  const [currentPage,setCurrentPage] = useState(2);
  const handlePage = async(page) => {
    setCurrentPage(page);
  };


  //
  const [usernameFilter, setUsernameFilter] = useState('');
  const handleUsernameFilterChange = (event) => {
    //event.preventDefault();
    setUsernameFilter(event.target.value);
    fetchData(limit,event.target.value,nameFilter,emailFilter);
  };

  const [nameFilter, setNameFilter] = useState('');
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
    fetchData(limit,usernameFilter,event.target.value,emailFilter);
  };

  const [emailFilter, setEmailFilter] = useState('');
  const handleEmailFilterChange = (event) => {
    setEmailFilter(event.target.value);
    fetchData(limit,usernameFilter,nameFilter,event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setLimit(selectedValue);
    fetchData(selectedValue,usernameFilter,nameFilter,emailFilter);
  };



  
  
   

  return (
    
    
    <div class="col-md-8 offset-2">

        <h2><font color='red'><center>ADMIN : USERS </center></font></h2>

        <hr></hr>

            <div class="row">
                <div class="col-md-2">
                    
                <select onChange={handleSelectChange} class="form-select">
                    <option value={10}>10</option>
                    <option value={1}>1</option>
                    <option value={25}>25</option>
                </select>
                </div>
            </div>
            <br></br>



                <Table bordered hover>
                    
                    <thead>
                        <tr>
                
                            <th>Username</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <td>Active</td>
                            <th><center>Actions</center></th>
                        </tr>
                    </thead>

                    <tfoot className="table-footer">
                    <tr>
                    
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
                        
                        <td></td>
                    </tr>
                    </tfoot>


                    <tbody>
                    {data.map((row) => {
                        return (
                                                                                    
                        <tr>    
                            <td> {row.username}</td>
                            <td> {row.last_name}</td>
                            <td> {row.email}</td>
                            <td> 
                                {row.is_active === true ? (
                                    <p>True</p>
                                  ) : (
                                    <p>False</p>
                                  )}
                            </td>
                            <td>


                            <button class="btn btn-info btn-sm" onClick={() => handleDetail(row.id)}>
                                        Detail</button>                                        
                            
                                        &nbsp; &nbsp;
                            
                            <button class="btn btn-warning btn-sm" onClick={() => handleEdit(row.id)}>
                                        Edit Groups</button>
                            
                                        &nbsp; &nbsp; 

                                {row.is_active === true ? (
                                    <button class="btn btn-danger btn-sm" onClick={() => handleState(row.id)}>
                                    Deactivate</button>
                                  ) : (
                                    <button class="btn btn-success btn-sm" onClick={() => handleState(row.id)}>
                                        Activate</button>
                                  )}

                            

                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </Table>



                {count} total records

                {currentPage}dfdsf


                <button 
                
                
                    class="btn btn-light btn-sm" onClick={() => handlePage(1)}>
                                        1</button>



                  {
                    currentPage !== 2 && currentPage !== 1 && currentPage !== 3 ?
                      '......':
                      ''
                  }


                  {            
                      currentPage !== 2 && currentPage !== 1 ?                     
                          <button class="btn btn-light btn-sm" 
                          onClick={() => handlePage(currentPage-1)}>
                            {currentPage-1}</button> :
                            ''
                    }                

                  
                    {
                      currentPage !== 1 ?
                          <button class="btn btn-light btn-sm" 
                          onClick={() => handlePage(currentPage)}>
                            {currentPage}</button> :
                            ''
                    }


                        <button class="btn btn-light btn-sm" 
                          onClick={() => handlePage(currentPage+1)}>
                            {currentPage+1}</button>


                          ..............
                            

                





                  
                
                






    </div>
  );
};

export default UsersTable;
