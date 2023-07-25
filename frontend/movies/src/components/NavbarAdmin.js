import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarAdmin = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Link to="/" className="navbar-brand fs-3 ubuntu">
            MOVIES
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
                <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-link fs-5">
                          Management
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <NavLink to="/admin/movies/add" className="nav-link">
                                Genres
                          </NavLink>
                          <NavLink to="/admin/movies/" className="nav-link">
                                Movies
                          </NavLink>
                          <NavLink to="/admin/movies/add" className="nav-link">
                                Users
                          </NavLink>
                      </Dropdown.Menu>
                </Dropdown>
                <NavLink to="/movies" className="nav-link fs-5">
                      Analize Reviews
                </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarAdmin;