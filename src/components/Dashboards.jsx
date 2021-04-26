import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, Button } from "reactstrap";
const App = () => {

    let data = localStorage.getItem('student');
    data = JSON.parse(data);
    return (
        <div>
            <Navbar color="faded" light expand="md">
                <NavbarToggler />
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/StudentLogout"><Button>Logout</Button></Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <p>Logged as : {data.username}</p>

            <Link to="/StudentDashboard"><button type="button" class="btn btn-primary">StudentDashboard</button></Link>
        </div>

    );
};
export default App;


