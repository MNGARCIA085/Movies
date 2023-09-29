import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { Table} from 'react-bootstrap';
import { URL_GROUPS_BASE } from '../../api/constantes';
import { consume_service } from '../../api/api';
import './MyComponent.css';
import AdvancedPagination from './AdvancedPagination';





const GroupsTable = () => {
  
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [count,setCount] = useState(0);
  const [totalPages,setTotalPages] = useState(Math.ceil(count / limit));

  // función que recupera los datos 
  const fetchData = async (limit=10,page=1,descriptionFilter='') => {
    const offset = (page -1)*limit;
    // obtengo los datos de los posibles filtros
    let query = `?limit=${limit}&offset=${offset}`; // dsp. agregar page
    if (descriptionFilter !== ''){
        query += `&description__contains=${descriptionFilter}`;
    }
    const response = await axios.get(`${URL_GROUPS_BASE}${query}`);
    setData(response.data.data);
    // cant. de registros
    setCount(response.data.count);
    // cant. de páginas
    setTotalPages(Math.ceil(response.data.count / limit));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async(id) => {
    const confirmacion = window.confirm("Are you sure?");
          if (confirmacion) {            
            try {
              //const jwtToken = localStorage.getItem('access_token');
              await consume_service(`${URL_GROUPS_BASE}${id}`,'delete',
                                      '',{},false);
              // recargo
              fetchData(limit,page,descriptionFilter);
            } catch (error) {
              console.error("Error al eliminar el elemento:", error);
            }
          }
  };




  //
  const handleEdit = async(id) => {
    navigate(`/admin/groups/upsert/${id}`, { replace: true });
  };


  // page
  const [currentPage,setCurrentPage] = useState(1);
  const handlePageChange = async(page) => { // handlePageChnge
    setCurrentPage(page);
    fetchData(limit,page,descriptionFilter);
  };


  //
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
    fetchData(limit,page,event.target.value);
  };

  
  // limit
  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setLimit(selectedValue);
    setTotalPages(Math.ceil(count / limit));
    fetchData(selectedValue,page,descriptionFilter);
  };



  
  
   

  return (
    
    
    <div class="col-md-12 offset-0">

            <div class="row">
                <div class="col-md-2">                    
                <select onChange={handleSelectChange} class="form-select">
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                </select>
                </div>
            </div>
            <br></br>



                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th><center>Actions</center></th>
                        </tr>
                    </thead>

                    <tfoot className="table-footer">
                    <tr>
                        <td>
                            <input
                                type="text"
                                class="form-control"
                                value={descriptionFilter}
                                onChange={handleDescriptionFilterChange}
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
                            <td> {row.description}</td>
                            
                            <td>

                            
                            <button class="btn btn-warning btn-sm" onClick={() => handleEdit(row.id)}>
                                        Edit Groups</button>
                            &nbsp; &nbsp; 

                            
                            <button class="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                                  Delete</button>

                            

                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </Table>



                {count} total records




                <AdvancedPagination currentPage={currentPage} 
                      itemPerPage={limit}
                      totalPages={totalPages}
                      onPageChange={handlePageChange} />
                            

                

    </div>
  );
};

export default GroupsTable;
