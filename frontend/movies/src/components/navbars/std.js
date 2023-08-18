import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import LogoutLink from "../auth/LogoutLink";
import './styles.css';




const NavbarStd = (props) => {


  return (
    <Navbar bg="light" expand="lg">
      <Link to="/" className="navbar-brand fs-3 ubuntu">
            MOVIES
      </Link>
      
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end my-custom-margin">
        
        
        <Nav className="ml-auto">



                    <NavLink to="/" className="nav-link fs-5">
                            Home
                    </NavLink>
                    <NavLink to="/movies" className="nav-link fs-5">
                            Movies
                    </NavLink>


                    { 
                        props.username !== null ?
                            <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" 
                                        className="nav-link fs-5">
                                                Welcome {props.username}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                    <NavLink to="/users/edit" className="nav-link">
                                        &nbsp; Edit profile
                                    </NavLink>
                                    <NavLink to="/users/changepassword" className="nav-link">
                                    &nbsp; Change password
                                    </NavLink>
                                        &nbsp; &nbsp; &nbsp;<LogoutLink />                                 
                                    </Dropdown.Menu>
                            </Dropdown>
                            :
                                <NavLink to="/login" className="nav-link fs-5">
                                        Log In
                                </NavLink>
                    }


                

                


                



        </Nav>
      </Navbar.Collapse>
    </Navbar>



  );
};

export default NavbarStd;




