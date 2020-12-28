
import {Link} from 'react-router-dom';
import {Nav, Navbar, Container} from "react-bootstrap";

function Header(){
    return(
        <>
        <Container fluid>
            <Navbar bg="primary" variant="dark" xs={12} md={12} sm={12}>
               <Navbar.Brand >Sistema de Eventos</Navbar.Brand>
               <Nav className="mr-auto">
                   <Link to="/home"> <Nav.Link href="#home">Home</Nav.Link> </Link>
                   <Link to="/events"> <Nav.Link href="#events">Events</Nav.Link></Link>
               </Nav>
            </Navbar>
        </Container>
            <br/>
       </>
    );
}

export default Header;