import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import MovieFilterForm from "./MovieFilterForm";
import { useNavigate, Link } from 'react-router-dom';






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
  const [currentPage, setCurrentPage] = useState(1); //0
  // const [deleted, setDeleted] = useState([]);


  // para mostrar u ocultar el form. de búsqueda
  const [isFormVisible, setFormVisible] = useState(false);
  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };


  const fetchUsers = async (page, size = perPage, title='',date='',dateFinal='',genres=[]) => {
    
        // loading
        setLoading(true);


        // filters
        let search = `?limit=${size}&offset=${page}`;
        if (title !==''){
            search +=  `&title__contains=${title}`;
        }
        if ((date !=='') && (date !== null) ){
          search +=  `&date__gte=${date}`;
        }
        if ((dateFinal !=='') && (dateFinal !== null) ){
          search +=  `&date__lte=${dateFinal}`;
        }

        genres.forEach(function(value, index) {
          search += `&genres=${value}`;
        });

        // url
        const url = `http://127.0.0.1:8000/movies/${search}`;

        // consumo el servicio
        const response = await axios.get(
          url
        );


        // ......
        setData(response.data); //response.data.data
        setTotalRows(20565); //response.data.total
        setLoading(false);
      };

      useEffect(() => {
        fetchUsers(0); //1
      }, []);

      



      const handleDelete = useCallback(
        row => async () => {
          const confirmacion = window.confirm("¿Estás seguro de eliminar este elemento?");
          if (confirmacion) {            
            try {
              await axios.delete(`http://127.0.0.1:8000/movies/${row.id}`);
              const response = await axios.get(
                `http://127.0.0.1:8000/movies/?limit=${perPage}&offset=${currentPage}`
              );
              // lo borra, pero ojo que devuelve 422
              setData(removeItem(response.data, row));
              setTotalRows(totalRows - 1);
            } catch (error) {
              console.error("Error al eliminar el elemento:", error);
            }
          }
        },
        [currentPage, perPage, totalRows]
      );
      





      const handleEdit = useCallback(
        row => async () => {
            navigate(`/admin/movies/edit/${row.id}`, { replace: true });
        }
      )

      const handleDetail = useCallback(
        row => async () => {
            navigate(`/movies/${row.id}`, { replace: true });
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
            name: "GENRES",
            selector: (row) => row.genres.map(g => g.description + "  "),
            sortable: true
          },
          {
            // eslint-disable-next-line react/button-has-type
            cell: row => <button class="btn btn-info" onClick={handleDetail(row)}>Detail</button>
          },
          {
            cell: row => <button class="btn btn-warning" onClick={handleEdit(row)}>Edit</button>
          },
          {
            cell: row => <button class="btn btn-danger" onClick={handleDelete(row)}>Delete</button>
          }
        
        ],
        [handleDetail,handleDelete,handleEdit],
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
          <div class="col-md-6 offset-md-0">

            <a href="#" onClick={toggleForm}>
                  {isFormVisible ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                  <br></br><br></br>
            </a>

              {isFormVisible && (
                   <MovieFilterForm filterData={fetchUsers}/>
              )}

              <br></br>

              <hr></hr>


          </div>
        </div>

        <br></br>

        

        <Link to="/admin/movies/add"><font color='violet'>Add</font></Link>

        <br></br> <br></br>


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