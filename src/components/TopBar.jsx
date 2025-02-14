import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";

function TopBar() {
  return (
    <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#1F2676" }}>
      <Container fluid>
        <Navbar.Brand href="#home">
          <i className="bi bi-brightness-high logo"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/weather">Previsioni</Link>
            <Link to="/weather/5-days">Per 5 giorni</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default TopBar;
