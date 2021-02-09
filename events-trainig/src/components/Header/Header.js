
import {NavLink} from 'react-router-dom';
import {Nav, Navbar, Container} from "react-bootstrap";

function Header(){
    return(
        <>
        <Container fluid>
            <Navbar bg="primary" variant="dark" xs={12} md={12} sm={12}>
               <Navbar.Brand >Sistema de Eventos</Navbar.Brand>
               <Nav className="mr-auto">
                   <NavLink style={{marginRight: "10px"}} className="text-white" to="/home">Home</NavLink>
                   <NavLink style={{marginRight: "10px"}} className="text-white" to="/events"> Events </NavLink>
               </Nav>
            </Navbar>
        </Container>
            <br/>
       </>
    );
}

export default Header;