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
            <Link to="/" className={"nav-link font-weight-bold" + (location.pathname === "/" ? " active" : "")}>
              Home
            </Link>
            {/*      <Link
              to="/weather"
              className={"nav-link font-weight-bold" + (location.pathname === "/weather" ? " active" : "")}
            >
              Previsioni Meteo
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default TopBar;
