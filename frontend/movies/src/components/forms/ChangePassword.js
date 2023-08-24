import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select/dist/js/bootstrap-select.min.js'; 
//import './styles.css';
import { consume_service } from '../../api/api';
import { URL_USERS_BASE } from '../../api/constantes';
import { decodeToken } from '../../utils';




const ChangePasswordForm = () => {



    // msje
    const [message, setMessage] = useState('');

    // form.
    const [formData, setFormData] = useState({
        password: '',
        password2:''
    });

    // errores
    const [errores, setErrores] = useState({
        password: '',
        password2:''
    });

    // id a partir del token
    const accessToken = localStorage.getItem('access_token');
    const {username, id, groups} = decodeToken(accessToken);


    
    // envio del formulario
    const handleSubmit = async (event) => {
            event.preventDefault();
            // Logic to send data to the server
            try {
                // consumo el servicio
                const jwtToken = localStorage.getItem('access_token');
                const response = await consume_service(`${URL_USERS_BASE}changepassword/${id}`,
                                    'patch',jwtToken,formData,true);
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
                        CHANGE PASSWORD
                    </font></b>
                  </center>
                <hr></hr>
              </div>
        </div>

        
        <Form onSubmit={handleSubmit}>

          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                </Form.Group>
                <div class="errormsg">{errores.password}</div>
            </div>
          </div>

          <br></br>

          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Form.Group controlId="password2">
                <Form.Label>Repeat password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                />
                </Form.Group>
                <div class="errormsg">{errores.password2}</div>
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

export default ChangePasswordForm;


