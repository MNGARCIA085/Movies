import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-select/dist/js/bootstrap-select.min.js'; 
import { useParams } from "react-router-dom";
import './styles.css';
import { consume_service } from '../../api/api';
import { URL_GENRES_BASE } from '../../api/constantes';




const GenreUpsert = () => {

    let { id } = useParams();



    const navigate = useNavigate(); // for navigation

    // FORM
    const [formData, setFormData] = useState({
        description: '',
    });

    // ERRORES
    const [errores, setErrores] = useState({
        description: '',
    });


    // para cargar los valores iniciales
    useEffect(() => {
        // initial data
        if (id !== undefined){
              const fetchData = async () => {
                try {
                  const response = await consume_service(`${URL_GENRES_BASE}${id}`,'get','',{},false);
                  const data = await response.data;
                  setFormData(
                      {
                          'description':data.description,
                      }
                  );
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
            // let aux = {...formData}
            // consumo el servicio
            const jwtToken = localStorage.getItem('access_token');
            // dependiendo si es post o put
            if (id !== undefined){
                await consume_service(`${URL_GENRES_BASE}${id}`,'put',
                            jwtToken,formData,true);
            }
            else {
                await consume_service(URL_GENRES_BASE,'post',jwtToken,formData,true);
             }
            // todo ok, redirect a ver todos los datos
            navigate('/admin/genres/', { replace: true });
        } catch (error) {
            console.error(error);
            setErrores(''); // reinicio los errores
            error.response.data.detail.forEach(
                element => {
                    setErrores((prevErrores) => ({
                        ...prevErrores,
                        [element['loc'][1]]:element['msg']
                    }))
                }
            );
            
        }
    };

    // cambios en el form.
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
        }));
    };


  
  


  return (


    <div>

        <div class="row">
            <div class="col-md-3 offset-md-4">
                <center><b><font color='red'>
                        {  id !== undefined ? 'EDIT' : 'ADD' } GENRE
                    </font></b>
                  </center>
                <hr></hr>
              </div>
        </div>

        
        <Form onSubmit={handleSubmit}>

          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Form.Group controlId="title">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                </Form.Group>
                <div class="errormsg">{errores.description}</div>
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

export default GenreUpsert;



