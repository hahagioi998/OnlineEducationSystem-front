import { Component } from "react"
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
class LogoutNavbar extends Component {
    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarToggler />
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/sign-up"><Button>Logout</Button></Link>
                            
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }

}
export default LogoutNavbar;

