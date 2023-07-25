import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username);
    console.log(password);

    const data = {'username':username,'password':password};

    console.log(typeof(data));

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
    } catch (error) {
      setMessage('Error en la solicitud');
    }
  };

  return (
    <div>
      <h1>Sistema de Inicio de Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
