import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { formatDateToString, parseStringToDate } from '../../common/common';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { consume_service } from '../../api/api';
import { URL_GENRES_BASE } from '../../api/constantes';




const MovieFilterForm = (props) => {
  
  
    const [formData, setFormData] = useState({
      title: '',
    });


    // cambios en la fecha
    // 1. Inicial
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
    // 2. Final
    const [selectedDateFinal, setSelectedDateFinal] = useState(null);
    const handleDateChangeFinal = (date) => {
      setSelectedDateFinal(date);
    };


    // para cargar los géneros
    const [options, setOptions] = useState([]);

    // Función para obtener el valor de cada opción (id en este caso)
    const getOptionValue = (option) => option.id;
    // Función para obtener la etiqueta de cada opción (description en este caso)
    const getOptionLabel = (option) => option.description;

    const [genres, setGenres] = useState([]);
    const handleGenres = (genre) => {
      setGenres(genre);
    };

    
    // para cargar los valores iniciales
    useEffect(() => {
      // géneros
      const fetchOptions = async () => {
          try {
            const response = await consume_service(URL_GENRES_BASE,'get','',{},false);
            const data = await response.data;
            setOptions(data.data); //data
          } catch (error) {
            console.error('Error fetching options from API:', error);
          }
        };
        fetchOptions();
      // fin
    }, []);


  // submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to send data to the server
    try {

        // convierto los géneros a lista de ids
        const genres_list = [];
        for ( let g in genres) {
          genres_list.push(genres[g]['id']);
        }

        const dateInit = selectedDate !== null ? formatDateToString(selectedDate) : '';
        const dateFinal = selectedDateFinal !== null ? formatDateToString(selectedDateFinal) : '';

        props.filterData(0,20,formData.title,
                          dateInit,
                          dateFinal,
                          genres_list
                        ); //page, size, title,datess, genres
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


            <div class="form-row row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                              />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputPassword4">Géneros</label>
                            <Select
                                isMulti
                                options={options}
                                value={genres}
                                onChange={handleGenres}
                                getOptionValue={getOptionValue}
                                getOptionLabel={getOptionLabel} 
                                className="selectpicker" 
                                data-live-search="true" 
                                data-actions-box="true"  
                              />
                        </div>
                    </div>
                </div>


                <br></br>


                <div class="form-row row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label htmlFor="datePicker">Fecha Inicial</label>
                                      <DatePicker
                                        id="datePicker"
                                        selected={selectedDate} //selectedDate
                                        onChange={handleDateChange} //handleDateChange
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control"
                              />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                          <label htmlFor="datePicker">Fecha Final</label>
                              <DatePicker
                                id="datePicker"
                                selected={selectedDateFinal} //selectedDate
                                onChange={handleDateChangeFinal} //handleDateChange
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                          />
                        </div>
                    </div>
                </div>


      <br></br>
      <br></br>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default MovieFilterForm;
