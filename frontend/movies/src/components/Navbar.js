import React from "react";
import { NavLink, Link } from "react-router-dom";

import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
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


            <NavLink to="/admin/movies" className="nav-link">
              Admin Movies
            </NavLink>


            <NavLink to="/admin/movies/add" className="nav-link">
              Admin Movies ADD
            </NavLink>


            <NavLink>

            <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Menú Multinivel
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <NavLink to="/admin/movies/add" className="nav-link">
              Admin Movies ADD
            </NavLink>

        <Dropdown.Item href="/movies">Opción 1</Dropdown.Item>
        <Dropdown.Item href="#action/2">Opción 2</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#action/3">Opción 3</Dropdown.Item>

        {/* Submenú */}
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-basic">
            Submenú
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#action/4">Opción 4</Dropdown.Item>
            <Dropdown.Item href="#action/5">Opción 5</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Dropdown.Menu>
    </Dropdown>
            </NavLink>

            

            


          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;