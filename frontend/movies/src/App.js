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

import { useState, useEffect } from "react";

import { decodeToken } from "./utils";

import Login from "./pages/login";


import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";


import NavbarStd from "./components/NavbarStd";
import UsersTable from "./components/admin/Users/Users";








function App() {

    const accessToken = localStorage.getItem('access_token');
    const {username, groups} = decodeToken(accessToken);

 
  return (
    <Router>

      {
        groups.includes('admin') ? 
            <div className="App">
              <NavbarAdmin  username={username} />
            </div>
          : 
            <div className="App">
              <NavbarStd username={username} />
            </div>
      }
    


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />     
        <Route path="/movies/:id" element={<MovieDetail />} />  


        <Route path="/admin/login" element={<Login />} />  



        <Route path="/admin/users" element={<UsersTable />} />  


        

        <Route
          path="/admin/movies"
          element={
            <ProtectedRoute user={username} groups={groups}>
              <AdminMovies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/movies/add"
          element={
            <ProtectedRoute user={username} groups={groups}>
              <MovieEditForm />
            </ProtectedRoute>
          }
        />

      <Route
          path="/admin/movies/edit/:id"
          element={
            <ProtectedRoute user={username} groups={groups}>
              <MovieEditForm />
            </ProtectedRoute>
          }
        />

             
      
      </Routes>



    </Router>
  );
}



//https://www.robinwieruch.de/react-router-private-routes/   (protected routes)




const Home = () => {
  return (
    <div className="App">
        HOME PAGE
    </div>
  );
};

export default App;