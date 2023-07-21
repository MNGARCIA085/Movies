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
import { formatDateToString } from '../../common/common';
import { parseStringToDate } from '../../common/common';



//https://react-select.com/home#react-select-bootstrap












const MovieEditForm = (props) => {

    let { id } = useParams();

    const API_URL =`http://127.0.0.1:8000/movies/${id}`; // for edit

    const navigate = useNavigate(); // for navigation

    const [formData, setFormData] = useState({
        //id:id,
        title: '',
        //description: '',
        date:'',
        image_link:'',
        genres:[]
    });



    // para cargar los géneros
    const [options, setOptions] = useState([]);

  
    // para cargar los valores iniciales
    useEffect(() => {

        // géneros
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
                    //'description':data.description,
                    //'date':data.date,
                    'image_link':data.image_link,
                    //'genres':data.genres
                }
            );
            // inicialización del textarea
            setTextareaValue(data.description);
            // inicialización de la fecha
            setSelectedDate(parseStringToDate(data.date));
            // inicialización de genres
            const init_genres = [];
            let claves = Object.keys(data.genres);
            for(let i=0; i< claves.length; i++){
              let clave = claves[i];
              init_genres.push({'id':data.genres[clave]['id'],'description':data.genres[clave]['description']});
            }
            setGenres(init_genres);
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


      const [genres, setGenres] = useState([]);
      const handleGenres = (genre) => {
        setGenres(genre);
      };




    // envio del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Logic to send data to the server
        try {            
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


            // convierto genres a solamente los ids para la API; me está pasando description en vez de 1
            let aux2 = [];
            for (const g of genres) {
                aux2.push(g.id);
              }
            let aux = {...formData,
                    "genres":aux2,
                    "date":formatDateToString(selectedDate),
                    "description":textareaValue};

            // consumo el servicio
            const response = await axios.put(
                API_URL,
                aux
            );
            // todo ok, redirect a ver todos los datos
            navigate('/admin/movies/', { replace: true });
        } catch (error) {
            console.error(error);
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


  // cambios en la fecha
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  

  // cambios en el textarea
  const [textareaValue, setTextareaValue] = useState('');
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  


  return (


    <div>

        <div class="row">
            <div class="col-md-3 offset-md-4">
                <center><b><font color='red'>EDIT MOVIE</font></b></center>
                <hr></hr>
              </div>
        </div>

        
        <Form onSubmit={handleSubmit}>

          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                </Form.Group>
            </div>
          </div>

          <br></br>

          <div class="row">
            <div class="col-md-3 offset-md-4">
            <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <textarea
              value={textareaValue}
              onChange={handleTextareaChange}
              className="form-control"
              rows="5"
            />
          </Form.Group>
          </div>
          </div>


          <br></br>
          

          <div class="row">
            <div class="col-md-3 offset-md-4">
              <div className="form-group">
                <label htmlFor="datePicker">Fecha</label>
                <DatePicker
                  id="datePicker"
                  selected={selectedDate} //selectedDate
                  onChange={handleDateChange} //handleDateChange
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <br></br>

          

          <div class="row">
            <div class="col-md-3 offset-md-4">
                <Form.Group controlId="description">
                <Form.Label>Image Link</Form.Label>
                <Form.Control
                  type="text"
                  name="image_link"
                  value={formData.image_link}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
          </div>

          <br></br>
        

          <div class="row">
            <div class="col-md-3 offset-md-4">
            <div className="form-group">
                  <label>Géneros:</label>
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

  </div>

  );
};

export default MovieEditForm;
