import React,{Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./CSS/navmenu.module.css";
import { Link } from 'react-router-dom'


class Navmenu extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar className={styles.navbar} >
                    <Navbar.Brand href="#home"><h2 className={styles.headerText}>Pooja</h2></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav  className="mr-auto">
                            <Nav.Link ><Link className="text-white" exact to='/'>Home</Link></Nav.Link>
                            <Nav.Link ><Link className="text-white" to='/Recipes'>Recipes</Link></Nav.Link>
                            <Nav.Link ><Link className="text-white" to='/CoronaInfo'>Corona-Info</Link></Nav.Link>
                            <Nav.Link ><Link className="text-white" to='/FruitsAndVeg'>Know your Food</Link></Nav.Link>
                           {/* <NavDropdown className="text-white"  className={styles.whiteText}title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item className="text-white" href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item className="text-white" href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item className="text-white" href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="text-white" href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>*/}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        );
    }
}
export default Navmenu;
