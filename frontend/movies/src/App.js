import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React  from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import AdminMovies from "./pages/admin/Movies";
import MovieEditForm from "./components/admin/MovieEditForm";
import jwt_decode from 'jwt-decode';


import NavbarAdmin from "./components/NavbarAdmin";

import { useState } from "react";



import Login from "./pages/login";


function App() {

  const [user, setUser] = useState('admin');



  const accessToken = localStorage.getItem('access_token');
  console.log(accessToken);

  // Decodificar el token para obtener información adicional
  //const decodedToken = jwt_decode(accessToken);
  //console.log(decodedToken);
  //const userGroups = decodedToken.groups;
  //console.log("Grupos del usuario:", userGroups);


  return (
    <Router>

      {
        user==='admin' ? 
            <div className="App">
              <NavbarAdmin />
            </div>
          : 
            <div className="App">
              <Navbar />
            </div>
        }



      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />     
        <Route path="/movies/:id" element={<MovieDetail />} />  
        <Route path="/admin/movies" element={<AdminMovies />} />
        <Route path="/admin/movies/add" element={<MovieEditForm />} />
        <Route path="/admin/movies/edit/:id" element={<MovieEditForm />} />
      </Routes>



    </Router>
  );
}

const Home = () => {
  return (
    <div className="App">
        HOME PAGE
    </div>
  );
};

export default App;