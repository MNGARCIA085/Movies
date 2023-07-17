import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import MovieFilterForm from "./MovieFilterForm";

import { useNavigate } from 'react-router-dom';

const removeItem = (array, item) => {
  const newArray = array.slice();
  newArray.splice(newArray.findIndex(a => a === item), 1);

  return newArray;
};







//https://react-data-table-component.netlify.app/?path=/docs/examples-filtering--filtering





const MoviesTable = () => {


  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  // const [deleted, setDeleted] = useState([]);

  const fetchUsers = async (page, size = perPage, title='') => {
    setLoading(true);

    let url = '';
    if (title !== ''){
       url = `http://127.0.0.1:8000/movies/?limit=${size}&offset=${page}&title__contains=${title}`
    }
    else {
      url = `http://127.0.0.1:8000/movies/?limit=${size}&offset=${page}`
    }


    console.log(url);


    const response = await axios.get(
      //`http://127.0.0.1:8000/movies/?limit=${size}&offset=${page}`
      url
    );

    //console.log(response);

    setData(response.data); //response.data.data
    setTotalRows(20565); //response.data.total
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(0); //1
  }, []);

  const handleDelete = useCallback(
    row => async () => {



      await axios.delete(`http://127.0.0.1:8000/moviefdgfdgfdgfds/${row.id}`);
      const response = await axios.get(
        //`https://reqres.in/api/users?page=${currentPage}&per_page=${perPage}`
        'http://127.0.0.1:8000/movies/?limit=${perPage}&offset=${currentPage}'
      );

      // lo borra, pero ojo que devuelve 422

      setData(removeItem(response.data, row));
      setTotalRows(totalRows - 1);
    },
    [currentPage, perPage, totalRows]
  );




  const handleEdit = useCallback(
    row => async () => {
      
      

        console.log(row.id);
        navigate(`/admin/movies/edit/${row.id}`, { replace: true });
        console.log('edit');
    }
  )






  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true
      },
      {
        name: "TITLE",
        selector: (row) => row.title,
        sortable: true
      },
      {
        name: "DATE",
        selector: (row) => row.date,
        sortable: true
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: row => <button class="btn btn-danger" onClick={handleDelete(row)}>Delete</button>
      },
      {
        // eslint-disable-next-line react/button-has-type
        cell: row => <button class="btn btn-warning" onClick={handleEdit(row)}>Edit</button>
      }
    ],
    [handleDelete,handleEdit],
    //[handleEdit]
  );

  const handlePageChange = page => {
    fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  return (

    <div>



        <div class="row">
          <div class="col-md-4 offset-md-4">
          <MovieFilterForm filterData={fetchUsers}/>
          </div>
        </div>

        <br></br>

          


          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationDefaultPage={currentPage}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            selectableRows
            onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
          />

    </div>

   
  );
};


export default MoviesTable;