import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";

function TopBar() {
  return (
    <Navbar variant="dark" expand="lg" className="topBar">
      <Container fluid>
        <Navbar.Brand href="#home">
          <Image src="./src/assets/logo2.png" className="logo" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className={"nav-link font-weight-bold" + (location.pathname === "/" ? " active" : "")}>
              Home
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default TopBar;
