import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select/dist/js/bootstrap-select.min.js'; 
//import './styles.css';
import { consume_service } from '../../api/api';
import { URL_USERS_BASE } from '../../api/constantes';
import { decodeToken } from '../../utils';




const UserEditForm = (props) => {

    //let { id } = useParams();

    // msje
    const [message, setMessage] = useState('');

    // form.
    const [formData, setFormData] = useState({
        username: '',
        last_name:'',
        first_name:'',
        email:''
    });

    // errores
    const [errores, setErrores] = useState({
        username: '',
        last_name:'',
        first_name:'',
        email:''
    });

    // id a partir del token
    const accessToken = localStorage.getItem('access_token');
    const {username, id, groups} = decodeToken(accessToken);




  
    // para cargar los valores iniciales
    useEffect(() => {

        const fetchData = async () => {
        try {
            // consumo la API
            const response = await consume_service(`${URL_USERS_BASE}${id}`,'get','',{},false);
            const data = await response.data;
            //setFormData(data);
            setFormData(
                {
                    username: data.username,
                    last_name:data.last_name,
                    first_name:data.first_name,
                    email:data.email
                }
            );
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        };
        // llamo a la fn.
        fetchData();

        // fin
      }, []);


    
    // envio del formulario
    const handleSubmit = async (event) => {
            event.preventDefault();
            // Logic to send data to the server
            try {
                // consumo el servicio
                const jwtToken = localStorage.getItem('access_token');
                const response = await consume_service(`${URL_USERS_BASE}${id}`,
                                    'put',jwtToken,formData,true);
                //
                setErrores('');
                // mensaje de ok
                setMessage('Succesfull update');
            } catch (error) {
                setMessage('');
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
                        EDIT PROFILE
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
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                </Form.Group>
                <div class="errormsg">{errores.username}</div>
            </div>
          </div>

          <br></br>

          
          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Form.Group controlId="description">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Form.Group>
              <div class="errormsg">{errores.first_name}</div>
            </div>
          </div>

          <br></br>

          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Form.Group controlId="description">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Form.Group>
              <div class="errormsg">{errores.last_name}</div>
            </div>
          </div>
          

          <br></br>

          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Form.Group controlId="description">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <div class="errormsg">{errores.email}</div>
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



        <div class="row">
            <div class="col-md-3 offset-md-4">
                <br></br>
                <font color='green'>{message}</font>
            </div>
        </div>

  </div>

  );
};

export default UserEditForm;


