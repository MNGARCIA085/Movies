import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Movies from "./pages/Movies";


import MovieDetail from "./pages/MovieDetail";
import AdminMovies from "./pages/admin/Movies";
import MovieEditForm from "./components/forms/MovieEdit";
import jwt_decode from 'jwt-decode';
import { useState, useEffect, useLocation } from "react";
import { decodeToken } from "./utils";
import Login from "./pages/login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignUpForm from "./components/forms/SignUp";
import UsersDataTable from "./components/datatables/UsersDatatable";
import UserDetail from "./components/cards/UserDetail";
import UserEditForm from "./components/forms/EditUser";
import ChangePasswordForm from "./components/forms/ChangePassword";
import AddGroupUserForm from "./components/forms/AddGroupUser";
import NavbarAdmin from "./components/navbars/admin";
import NavbarStd from "./components/navbars/std";



import MoviesTable from "./components/datatables/Movies";





function App() {

    const accessToken = localStorage.getItem('access_token');
    const {username, groups} = decodeToken(accessToken); // no hace falta ponga id,desestructuro


    const ruta = window.location.pathname;
    let aux=false;
    if (ruta.startsWith('/admin')) {
      aux = true;
    }

    // no necestio los grupos, sólo el path, porue las rutasd e admin ya están protegdias



      
              
 
  return (
    <Router>

        {  aux === true ? <NavbarAdmin username={username}/> : <NavbarStd username={username}/> } 

 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        
        <Route path="/movies" element={<Movies />} />     
        <Route path="/movies/:id" element={<MovieDetail />} />  
 
        <Route path="/users/edit" element={<UserEditForm />} /> 
        <Route path="/users/changepassword" element={<ChangePasswordForm />} /> 

        



        <Route path="admin/login" element={<Login />} />  
        <Route path="admin/users" element={<UsersDataTable />} /> 
        <Route path="admin/users/:id" element={<UserDetail />} />  
        <Route path="admin/users/addgroupuser/:id" element={<AddGroupUserForm />} />

        <Route
          path="admin/movies"
          element={
            <ProtectedRoute user={username} groups={groups}>
              <AdminMovies />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/movies/add"
          element={
            <ProtectedRoute user={username} groups={groups}>
              <MovieEditForm />
            </ProtectedRoute>
          }
        />

      <Route
          path="admin/movies/edit/:id"
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