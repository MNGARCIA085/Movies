import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation} from "react-router-dom";
import { decodeToken } from '../utils';
import { URL_LOGIN_TOKEN } from '../api/constantes';
import { NavLink, Link } from "react-router-dom";

const Login = () => {

  //
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_LOGIN_TOKEN,
      
            {username:username,password:password},
            {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
      );
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      setMessage('Inicio de sesión exitoso');
      // decodifico el token y según si estoy en login u admin/login a dónde voy
      //const {user, groups} = decodeToken(access_token);
      console.log(location.pathname);

      if (location.pathname.includes('admin')){

        // debo saber si tiene rol admin
        const {user, groups} = decodeToken(access_token);
        if (groups.includes('admin')){
          window.location.href = '/admin';
        }
        else {
          setMessage('Must be administrator');
        }
      }
      else {
        window.location.href = '/movies';
      }

      // quizás acá deba decodificar
      // redirecciono 
      //navigate('/',{ replace: true });
      //window.location.href = '/admin';

    } catch (error) {
      setMessage('Error en la solicitud');
    }
  };

  return (
    <div class="col-md-3 offset-3">
      
      <h3>LOG IN</h3>
      
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            class="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>


        <br></br>
        
        
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            class="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br></br>

        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
      </form>
      <br></br>
      <p><font color='red'>{message}</font></p>


      Don't have an account? <NavLink to="/signup">
        <font color='blue'><b>Sign Up</b></font></NavLink>
 
      
      
  
    </div>
  );
}

export default Login;
