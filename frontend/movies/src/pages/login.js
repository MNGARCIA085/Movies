import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login/token',
      
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






      // quizás acá deba decodificar


      // redirecciono 
      //navigate('/',{ replace: true });
      window.location.href = '/admin';




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
      <p>{message}</p>
    </div>
  );
}

export default Login;
