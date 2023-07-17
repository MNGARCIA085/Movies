import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const MovieFilterForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date:''
  });




  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send data to the server
    try {


        console.log(formData.title);


        props.filterData(0,20,formData.title); //page, size, title

    } catch (error) {
      console.error(error);
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
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>

        <br></br>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="text"
          name="date"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>
      
      <br></br>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MovieFilterForm;
