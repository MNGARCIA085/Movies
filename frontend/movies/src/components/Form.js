import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { consume_service } from '../api/api';
import { URL_REVIEWS_BASE } from '../api/constantes';
import Select from 'react-select';
import { ReactSelectBootstrap } from 'react-select-bootstrap';


//https://react-select.com/home


 const MyForm = (props) => {
   
  
  
  // obtener el usuario a partir del token
  const accessToken = localStorage.getItem('access_token');

  const [formData, setFormData] = useState({
      movie_id:props.movie_id,
      score: '',
      description: ''
  });


  // errores
  const [scoreError, setScoreError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');


  const [message, setMessage] = useState('');  


  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send data to the server
    try {


        // limpio errores
        setScoreError('');


        let aux = {...formData,"score":parseInt(score['value'])};
        const response = await consume_service(URL_REVIEWS_BASE,'post',accessToken,aux,true);
         // const response = await axios.post('http://127.0.0.1:8000/reviews',formData);
        //console.log(response.data);
        // si tiene un id es que salió bien
        // Logic to process the server response
        //const data = await response.json();
       //console.log(data); // You can update your component state with the response here
       const datos = response.data;
        // actualizo eleemnto del padre
        const data = {
              "user":{
                "username":datos.user.username},
                 "score":datos.score,
                 "date":datos.date,
                 "description":datos.description};
        props.myReview(data);
        // cierro el modal
        props.onClose();
    } catch (error) {
      if (typeof(error.response.data.detail)==='string'){
          setMessage(error.response.data.detail); 
      } else {
          error.response.data.detail.forEach(
              element => {
                  console.log(element);
                  if (element['loc'][1] === 'score'){
                      setScoreError(element['msg']);
                  } 
                  else if (element['loc'][1] === 'description'){
                      setDescriptionError(element['msg']);
                  }
              }
          );
      }      
    }
  };


  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ]

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const [score, setScore] = useState([]);
    const handleScore = (score) => {
      setScore(score);
    };




  return (
    
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="score">
        <Form.Label>Score</Form.Label>
              <Select
                  options={options}
                    value={score}
                    onChange={handleScore}
                    data-live-search="true" // Habilitar búsqueda en tiempo real
              />        
        <small  class="text-danger">
            {scoreError}
        </small> 
      
      
      
      </Form.Group>

        <br></br>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <small class="text-danger">
            {descriptionError}
        </small> 
      </Form.Group>

      <br></br>

      <div  class="text-danger">
            {message}
        </div>

        <br></br>



      <br></br>
      <Button variant="primary" type="submit">
        Submit
      </Button>

      


      


    </Form>
  );
};

export default MyForm;
