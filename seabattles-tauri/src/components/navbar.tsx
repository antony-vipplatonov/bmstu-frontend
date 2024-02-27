import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar className="navbar-light navbar-expand" expand="lg">
      <Container fluid className="new flex-column" style={{width:"100%"}}>
        <Navbar.Brand as={Link} to="/bmstu-frontend/" className="brand text-center" style={{fontSize:"2em"}}><div className="gText gTitle">Морские сражения на Тихом океане</div></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 d-flex justify-content-center ">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/bmstu-frontend/" className="li mx-3" style={{flex:"1"}}><div className="gText">Главная</div></Nav.Link>
            <Nav.Link as={Link} to="/bmstu-frontend/seabattles" className="li mx-3" style={{flex:"1"}}><div className="gText">Архив</div></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
</Navbar>
  );
}

export default NavBar;