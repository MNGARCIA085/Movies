import React, {useState, useEffect} from "react";
import { NavLink, Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import LogoutLink from "./LogoutLink";


import { decodeToken } from "../utils";


const Navbar = (props) => {

  const accessToken = localStorage.getItem('access_token');
  console.log('access toekn',accessToken);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">


        
        <Link to="/" className="navbar-brand fs-3 ubuntu">
            MOVIES
        </Link>
        
        <style jsx>{`
          button[aria-expanded="false"] > .close {
            display: none;
          }
          button[aria-expanded="true"] > .open {
            display: none;
          }
        `}</style>
        
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="fas fa-bars open text-dark"></span>
          <span class="fas fa-times close text-dark"></span>
        </button>
        
        
        <div
          className="collapse navbar-collapse justify-content-end"
                  id="navbarNavAltMarkup">

          <div className="navbar-nav fs-5">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/movies" className="nav-link">
                  Movies
                </NavLink>
          </div>



          { 
                  props.username !== null ?
                                    <Dropdown>
                                          <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-link fs-5">
                                                      Welcome {props.username}
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu>
                                          <NavLink to="/admin/movies/add" className="nav-link">
                                                Edit profile
                                          </NavLink>
                                                &nbsp; <LogoutLink />                                 
                                          </Dropdown.Menu>
                                    </Dropdown>
                              :
                                    <NavLink to="/login" className="nav-link fs-5">
                                          Log In
                                    </NavLink>
                }




        </div>
      </div>
    </nav>
  );
};

export default Navbar;