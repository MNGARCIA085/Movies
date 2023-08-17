import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import LogoutLink from "../LogoutLink";








const NavbarAdmin = (props) => {


  return (
    <Navbar bg="light" expand="lg">
      <Link to="/" className="navbar-brand fs-3 ubuntu">
            MOVIES
      </Link>
      
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end my-custom-margin">
                    <Nav className="ml-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-link fs-5">
                                    Management
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {/*
                                    <NavLink to="/admin/movies/add" className="nav-link">
                                            Genres
                                    </NavLink>
                                        */}
                                    
                                    {/* Agregamos un submenú */}
                                    <Dropdown>
                                            <Dropdown.Toggle variant="light" id="dropdown-submenu" className="nav-link">
                                                Auth
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <NavLink to="/admin/users" className="nav-link">
                                                Users
                                            </NavLink>
                                            <NavLink to="/admin/users" className="nav-link">
                                                Groups
                                            </NavLink>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        {/* Agregamos un submenú */}
                                        <Dropdown>
                                            <Dropdown.Toggle variant="light" id="dropdown-submenu" className="nav-link">
                                                Movies
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <NavLink to="/admin/movies" className="nav-link">
                                                Movies
                                            </NavLink>
                                            <NavLink to="/admin/users" className="nav-link">
                                                Genres
                                            </NavLink>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        {/* fin de este dropdown */}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-link fs-5">
                                    Analize
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <NavLink to="/admin/movies/" className="nav-link">
                                            Reviews
                                    </NavLink>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-link fs-5">
                                                Welcome {props.username} 
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                    <NavLink to="/users/edit" className="nav-link">
                                        Edit profile
                                    </NavLink>
                                    <NavLink to="/users/changepassword" className="nav-link">
                                        Change password
                                    </NavLink>
                                        &nbsp; <LogoutLink />                                 
                                    </Dropdown.Menu>
                            </Dropdown>

                                
                        </Nav>
                    </Navbar.Collapse>



                </Navbar>


       



  );
};

export default NavbarAdmin;




