import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { ReactSelectBootstrap } from 'react-select-bootstrap';
import 'bootstrap-select/dist/css/bootstrap-select.min.css'; // Estilos del Bootstrap Select Picker
import 'bootstrap-select/dist/js/bootstrap-select.min.js'; 

import { useParams } from "react-router-dom";

const MovieEditForm = (props) => {

    let { id } = useParams();

    const API_URL =`http://127.0.0.1:8000/movies/${id}`; // for edit

    const navigate = useNavigate(); // for navigation

    const [formData, setFormData] = useState({
        //id:id,
        title: '',
        description: '',
        date:'',
        image_link:'',
        genres:[]
    });



    // para cargar los géneros
    const [selectedOptions, setSelectedOptions] = useState([]);





    const [options, setOptions] = useState([]);

    


    // para cargar los valores iniciales
    useEffect(() => {



        // géneros
        const API_GENRES = 'http://127.0.0.1:8000/genres/';
        const fetchOptions = async () => {
            try {
              const response = await axios.get('http://127.0.0.1:8000/genres/');
              const data = await response.data;
              setOptions(data);
              //setOptions(data.options); // Suponemos que la API devuelve un array de opciones
              //setOptions([{'label':'dsfds','value':17},{'label':'marcos','value':18}]);
            } catch (error) {
              console.error('Error fetching options from API:', error);
            }
          };
          fetchOptions();


        // intial data
        const fetchData = async () => {
          try {
            const response = await fetch(API_URL);
            const data = await response.json();
            //setFormData(data);
            setFormData(
                {
                    'title':data.title,
                    'description':data.description,
                    'date':data.date,
                    'image_link':data.image_link,
                    'genres':data.genres
                }
            );
            setSelectedDate(new Date(data.date));
          } catch (error) {
            console.error('Error fetching data from API:', error);
          }
        };
        fetchData();


        // fin
      }, []);


      // Función para obtener el valor de cada opción (id en este caso)
        const getOptionValue = (option) => option.id;
        // Función para obtener la etiqueta de cada opción (description en este caso)
        const getOptionLabel = (option) => option.description;





      // cambios en el select      
      const handleSelectChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
        console.log(selectedValues);
        setSelectedOptions(selectedValues);
      };



      const [genres, setGenres] = useState([]);
      const handleGenres2 = (event) => {
        const selectedGenres = Array.from(event.target.selectedOptions, (option) => option.value);
        console.log('genres',selectedGenres);
        setGenres(selectedGenres);
      };

      const handleGenres = (genre) => {
        setGenres(genre);
      };




    // envio del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Logic to send data to the server
        try {
            //const res = await axios.put('https://httpbin.org/put', { hello: 'world' });
            
            /**
            const response = await axios.put(
                API_URL,
                {
                'title':'Smile2',
                'description':'sadsa',
                'date':'2023-07-12',
                'image_link':'https://play-lh.googleusercontent.com/NLd3erPoZmSi0oczSzNqq_MF0q-2sGR2PRLD9_RrgAGHjLjRWI5zbs4LrI8NGa-k0zcfQvV6B6hcii4zIRg',
                "genres": [
                    1
                ]
            },
            */


            console.log('genressss',genres);


            let aux2 = [];

            for (const g of genres) {
                aux2.push(g.id);
              }


            let aux = {...formData,"genres":aux2}; // me está pasando description en vez de 1.


            console.log(aux);


            
            
            const response = await axios.put(
                API_URL,
                aux
            );
            // todo ok, redirect a ver todos los datos
            //navigate('/admin/movies/', { replace: true });
        } catch (error) {
            console.log('dsfs');
            //console.error(error);
        // manejo de errores
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


  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
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


        <textarea
          id="myTextarea"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          rows="4" // Puedes ajustar la cantidad de filas que se muestran
        />


        
      </Form.Group>

      <div className="form-group">
      <label htmlFor="datePicker">Fecha</label>
      <DatePicker
        id="datePicker"
        selected={selectedDate}
        onChange={handleDateChange} //handleDateChange
        dateFormat="yyyy-MM-dd"
        className="form-control"
      />
    </div>

      <Form.Group controlId="description">
        <Form.Label>Image Link</Form.Label>
        <Form.Control
          type="text"
          name="image_link"
          value={formData.image_link}
          onChange={handleChange}
        />
      </Form.Group>





      <div className="form-group">
        <label>Selecciones múltiples:</label>
        <Select
          isMulti
          options={options}
          value={genres}
          onChange={handleGenres}
          getOptionValue={getOptionValue} // Especifica cómo obtener el valor de cada opción
          getOptionLabel={getOptionLabel} // Especifica cómo obtener la etiqueta de cada opción
          className="selectpicker" // Clase para habilitar Bootstrap Select Picker
          data-live-search="true" // Habilitar búsqueda en tiempo real
          data-actions-box="true" // Mostrar las opciones seleccionadas en una caja
        />
      </div>



     


           
      


      
      <br></br>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MovieEditForm;
