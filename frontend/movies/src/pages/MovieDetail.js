
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import React, {useState} from 'react';
import axios from "axios";
import Reviews from '../components/Reviews';
import MyForm from '../components/Form';
import { Modal, Button } from 'react-bootstrap';

const MovieDetail = () => {

        const [data, setData] = useState([]);

        const [rev, setRev] = useState([]);

        let { id } = useParams();

        const baseURL = 'http://127.0.0.1:8000/movies/' + id;

        
        React.useEffect(() => {
            axios.get(baseURL).then((response) => {
                setData(response.data);
                setRev(response.data.reviews); // rev es por review
            });
        }, []);



        // MODAL PARA EL FORMULARIO

        const [showModal, setShowModal] = useState(false);
        
      
        const handleOpenModal = () => {
          setShowModal(true);
        };
      
        const handleCloseModal = () => {
          setShowModal(false);
        };
      



        
        
        


        

        return (
            <div>

                        <div class="row">
                            <div class="col-md-8 offset-md-2">
                            <h3><font color='red'><center><h2>{data.title}</h2></center></font></h3>
                        <hr></hr>
                                <center>
                                    <img src={data.image_link} alt='Description' 
                                            width="440px" height="400px"></img> 
                                </center>
                                <br></br>
                                {data.description}
                            </div>
                        </div>

                        <br></br>

                        

                        <div class="row">
                            <div class="col-md-8 offset-md-2">
                                <b><font color='lighblue'><h4>REVIEWS</h4></font></b> 
                                <br></br>
                                <Button onClick={handleOpenModal}>Add my review</Button>
                                <br></br> <br></br>
                                <Reviews reviews={rev}/>
                            </div>
                        </div>

    
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                            <Modal.Title>Add Review</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                    <MyForm movie_id={id}  
                                        onClose={handleCloseModal}/>
              
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cerrar
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        
                    
                    </div>
        )


}

export default MovieDetail;