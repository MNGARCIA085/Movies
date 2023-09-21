import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Table  } from 'react-bootstrap';
import { URL_MOVIES_BASE, URL_GENRES_BASE } from '../../api/constantes';
import { consume_service } from '../../api/api';
import './MyComponent.css';
import AdvancedPagination from './AdvancedPagination';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { formatDateToString, parseStringToDate } from '../../common/common';



const MoviesTable = () => {



  
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1); //0
  const [count,setCount] = useState(0);
  const [totalPages,setTotalPages] = useState(Math.ceil(count / limit));



  // función que recupera los datos 
  const fetchData = async (limit=10,page=1,title='',date='',genres=[]) => {


    


    const offset = (page -1)*limit;

    // obtengo los datos de los posibles filtros
    let search = `?limit=${limit}&offset=${page}`;
    if (title !==''){
        search +=  `&title__contains=${title}`;
    }
    if ((date !=='') && (date !== null) ){
      const formatedDate = date !== null ? formatDateToString(date) : '';
      search +=  `&date__gte=${formatedDate}&date__lte=${formatedDate}`;
    }


   


    for (var objeto of genres) {
      search += `&genres=${objeto.id}`;
    }

    /** 
    if (genres !==''){
      genres.forEach(function(value, index) {
        search += `&genres=${value}`;
      });
    };
    */

    

    // obtengo los datos
    const response = await consume_service(`${URL_MOVIES_BASE}${search}`,'get','',{},false);
    setData(response.data.data);
    
    // cant. de registros
    setCount(response.data.count);
    // cant. de páginas
    setTotalPages(Math.ceil(response.data.count / limit));
  };







  const fetchOptions = async () => {
    try {
      const response = await consume_service(URL_GENRES_BASE,'get',{});
      const data = await response.data;
      console.log(response.data);
      setOptions(data);
    } catch (error) {
      console.error('Error fetching options from API:', error);
    }
  };
  



  useEffect(() => {
    fetchData();
    fetchOptions(); // para la búsquea
  }, []);





  //
  const handleDetail = async(id) => {
    navigate(`/admin/movies/${id}`, { replace: true });
  };

  //
  const handleEdit = async(id) => {
    navigate(`/admin/movies/edit/${id}`, { replace: true });
  };

  //
  const handleDelete = async(id) => {
    //setData(prevData => prevData.filter(item => item.id !== id)); de borrar lo hace bien
    const confirmacion = window.confirm("Are you sure?");
          if (confirmacion) {            
            try {
              const jwtToken = localStorage.getItem('access_token');
              await consume_service(`${URL_MOVIES_BASE}${id}`,'delete',jwtToken,{},true);
              // recargo
              fetchData(limit,page,titleFilter,dateFilter,genresFilter);
            } catch (error) {
              console.error("Error al eliminar el elemento:", error);
            }
          }
  };


  // page
  const [currentPage,setCurrentPage] = useState(1);
  const handlePageChange = async(page) => { // handlePageChnge
    setCurrentPage(page);
    fetchData(limit,page,titleFilter,dateFilter,genresFilter);
  };


  //
  const [titleFilter, setTitleFilter] = useState('');
  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
    fetchData(limit,page,event.target.value,dateFilter,genresFilter);
  };

  const [dateFilter, setDateFilter] = useState('');
  const handleDateFilterChange = (date) => {
    setDateFilter(date);
    fetchData(limit,page,titleFilter,date,genresFilter);
  };

  



  const [genresFilter, setGenresFilter] = useState('');
 
   // campo tipo select
   const [options, setOptions] = useState([]);
   const getOptionValue = (option) => option.id;
   const getOptionLabel = (option) => option.description;
 
   // genres
   const handleGenresFilter = (data) => {
     setGenresFilter(data);
     fetchData(limit,page,titleFilter,dateFilter,data);
   };










  // limit
  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setLimit(selectedValue);
    setTotalPages(Math.ceil(count / limit));
    fetchData(selectedValue,page,titleFilter,dateFilter,genresFilter);
  };



  
  
   

  return (
    
    
    <div class="col-md-12 offset-0">


          
          <br></br><br></br>


        

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
                
                            <th>Title</th>
                            <th>Date</th>
                            <th>Genres</th>
                            <th><center>Actions</center></th>
                        </tr>
                    </thead>

                    <tfoot className="table-footer">
                    <tr>
                    
                        <td>
                            <input
                                type="text"
                                class="form-control"
                                value={titleFilter}
                                onChange={handleTitleFilterChange}
                                placeholder="Type something..."
                            />
                        </td>

                        <td>
                        
                            
                                      <DatePicker
                                          id="datePicker"
                                          selected={dateFilter} //selectedDate
                                          onChange={handleDateFilterChange} //handleDateChange
                                          dateFormat="yyyy-MM-dd"
                                          className="form-control"
                                          placeholderText='Initial Date'
                                      />


                                      <DatePicker
                                          id="datePicker2"
                                          selected={dateFilter} //selectedDate
                                          onChange={handleDateFilterChange} //handleDateChange
                                          dateFormat="yyyy-MM-dd"
                                          className="form-control"
                                          placeholderText='Final Date'
                                      />

                        </td>
                        
                        
                        
                        <td>
                        
                        <Select
                              isMulti
                              options={options}
                              value={genresFilter}
                              onChange={handleGenresFilter}
                              getOptionValue={getOptionValue} // Especifica cómo obtener el valor de cada opción
                              getOptionLabel={getOptionLabel} // Especifica cómo obtener la etiqueta de cada opción
                              className="selectpicker" // Clase para habilitar Bootstrap Select Picker
                              data-live-search="true" // Habilitar búsqueda en tiempo real
                              data-actions-box="true" // Mostrar las opciones seleccionadas en una caja
                              required
                            />  
                        
                        
                        </td>

                        <td></td>
                        
                        
                      </tr>
                    </tfoot>


                    <tbody>
                    {data.map((row) => {
                        return (
                                                                                    
                        <tr>    
                            <td> {row.title}</td>
                            <td> {row.date}</td>
                            <td> 


                              {row.genres.map((row2) => {
                                    return (<div>{row2.description}&nbsp;</div>)
                                })} 


                            </td>

                            <td>


                            <button class="btn btn-info btn-sm" onClick={() => handleDetail(row.id)}>
                                        Detail</button>                                        
                            
                                        &nbsp; &nbsp;
                            
                            <button class="btn btn-warning btn-sm" onClick={() => handleEdit(row.id)}>
                                        Edit</button>
                            
                                        &nbsp; &nbsp;     

                            <button class="btn btn-danger btn-sm" onClick={() => handleDelete(row.id)}>
                                  Delete</button>
                
                            &nbsp; &nbsp;                          

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

export default MoviesTable;
