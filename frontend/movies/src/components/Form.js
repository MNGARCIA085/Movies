import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const MyForm = (props) => {
  const [formData, setFormData] = useState({
    movie_id:props.movie_id,
    score: '',
    description: ''
  });


  // errores
  const [scoreError, setScoreError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send data to the server
    try {
        const response = await axios.post('http://127.0.0.1:8000/reviews',formData);
        //console.log(response.data);
        // si tiene un id es que salió bien
        // Logic to process the server response
        //const data = await response.json();
       //console.log(data); // You can update your component state with the response here
        props.onClose();
    } catch (error) {
      //console.error(error.response.data.detail);

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
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };



  


  return (
    
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="score">
        <Form.Label>Score</Form.Label>
        <Form.Control
          type="text"
          name="score"
          value={formData.score}
          onChange={handleChange}
        />
        <small id="passwordHelp" class="text-danger">
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
        <small id="passwordHelp" class="text-danger">
            {descriptionError}
        </small> 
      </Form.Group>
      
      
      
      <br></br>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MyForm;
