import React, { useState } from 'react';
import axios from 'axios';
import { URL_USERS_BASE } from '../../api/constantes';
import { consume_service } from '../../api/api';

const SignUpForm = () => {

  // CAMPOS
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');

  //ERRORES
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [first_nameError, setFirstNameError] = useState('');
  const [last_nameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password2Error, setPassword2Error] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      const data = {username,password,first_name,last_name,email,password,password2};
      const response = await consume_service(URL_USERS_BASE,'post','',data,false);


      
      // redirect al login si sale bien
      window.location.href = '/login';

    } catch (error) {
      //console.log(error);
      error.response.data.detail.forEach(
        element => {
            switch (element['loc'][1]) {
              case 'username':
                setUsernameError(element['msg']);
                break;
              case 'first_name':
                  setFirstNameError(element['msg']);
                  break;
              case 'last_name':
                    setLastNameError(element['msg']);
                    break;
              case 'email':
                    setEmailError(element['msg']);
                    break;
              case 'password':
                    setPasswordError(element['msg']);
                    break;
               case 'password2':
                    setPassword2Error(element['msg']);
                    break;
              default:
                console.log('pass');
            }
        }
      );
      setMessage('Error en la solicitud');
    }
  };

  return (
    <div class="col-md-3 offset-3">
      
      <h3>SIGN UP</h3>
      
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Username</label>
          <input
            type="text"
            class="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div class="errormsg">{usernameError}</div>


        <br></br>
        <div>
          <label>First name:</label>
          <input
            type="text"
            class="form-control"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div class="errormsg">{first_nameError}</div>

        <br></br>
        <div>
          <label>Last name:</label>
          <input
            type="text"
            class="form-control"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div class="errormsg">{last_nameError}</div>


        <br></br>
        <div>
          <label>Email:</label>
          <input
            type="text"
            class="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="errormsg">{emailError}</div>


        <br></br>
        
        
        <div>
          <label>Password:</label>
          <input
            type="password"
            class="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="errormsg">{passwordError}</div>


        <br></br>

        <div>
          <label>Password 2:</label>
          <input
            type="password"
            class="form-control"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div class="errormsg">{password2Error}</div>

        <br></br>

        <button type="submit" class="btn btn-primary">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignUpForm;
