import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select/dist/js/bootstrap-select.min.js'; 
import { useParams } from "react-router-dom";
import './styles.css';
import { consume_service } from '../../../api/api';
import { URL_USERS_BASE ,URL_GROUPS_BASE } from '../../../api/constantes';





const UserEditForm = () => {

    let { id } = useParams();

    const navigate = useNavigate(); // for navigation

    // para cargar los géneros en el form.
    const [options, setOptions] = useState([]);
    // Función para obtener el valor de cada opción (id en este caso)
    const getOptionValue = (option) => option.id;
    // Función para obtener la etiqueta de cada opción (description en este caso)
    const getOptionLabel = (option) => option.description;
    // set genres
    const [groups, setGroups] = useState([]);
    const handleGroups = (group) => {
      setGroups(group);
    };


    // username
    const [username, setUsername] = useState([]);


    
    // para cargar los valores iniciales
    useEffect(() => {
        // géneros
        const fetchOptions = async () => {
            try {
              const response = await consume_service(URL_GROUPS_BASE,'get','',{},false);
              const data = await response.data;
              setOptions(data);
            } catch (error) {
              console.error('Error fetching options from API:', error);
            }
          };
          fetchOptions();

        // initial data
        if (id !== undefined){
              const fetchData = async () => {
                try {
                  const response = await consume_service(`${URL_USERS_BASE}/${id}`,'get','',{},false);
                  const data = await response.data;
                  setUsername(data.username);


                  // inicialización de grupos
                  const init_groups = [];
                  let claves = Object.keys(data.groups);
                  for(let i=0; i< claves.length; i++){
                    let clave = claves[i];
                    init_groups.push({'id':data.groups[clave]['id'],'description':data.groups[clave]['description']});
                  }
                  setGroups(init_groups);
                } catch (error) {
                  console.error('Error fetching data from API:', error);
                }
              };
              fetchData();
        };

        // fin
      }, []);


    
    // envio del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Logic to send data to the server
        try {            
            // convierto genres a solamente los ids para la API; me está pasando description en vez de 1
            let groups_ids = [];
            for (const g of groups) {
                groups_ids.push(g.id);
              }
            // consumo el servicio
            const jwtToken = localStorage.getItem('access_token');
            const response = await consume_service(`${URL_USERS_BASE}/addgroups/${id}`,
                    'post',jwtToken,groups_ids,true);
            // todo ok, redirect a ver todos los datos
            navigate('/admin/users/', { replace: true });
        } catch (error) {
            console.error(error);
        }
    };




  

  return (

    <div>

        <div class="row">
            <div class="col-md-3 offset-md-4">
                <center><b><font color='red'>
                        ADD GROUPS TO AN USER
                    </font></b>
                  </center>
                <hr></hr>
              </div>
        </div>

        
        <Form onSubmit={handleSubmit}>

          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Form.Group controlId="title">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={username}
                  readOnly
                />
                </Form.Group>
            </div>
          </div>

          

          <br></br>
        

          <div class="row">
            <div class="col-md-3 offset-md-4">
            <div className="form-group">
                  <label>Groups:</label>
                  <Select
                    isMulti
                    options={options}
                    value={groups}
                    onChange={handleGroups}
                    getOptionValue={getOptionValue} // Especifica cómo obtener el valor de cada opción
                    getOptionLabel={getOptionLabel} // Especifica cómo obtener la etiqueta de cada opción
                    className="selectpicker" // Clase para habilitar Bootstrap Select Picker
                    data-live-search="true" // Habilitar búsqueda en tiempo real
                    data-actions-box="true" // Mostrar las opciones seleccionadas en una caja
                    required
                  />
                </div>
              </div>
        </div>
          
          <br></br>


          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </div>


        </Form>

  </div>

  );
};

export default UserEditForm;



