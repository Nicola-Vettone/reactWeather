import { Container, Nav, Navbar } from "react-bootstrap";

function TopBar() {
  return (
    <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#221f1f" }}>
      <Container fluid>
        <Navbar.Brand href="#home">
          <i className="bi bi-brightness-high logo"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Previsioni</Nav.Link>
            <Nav.Link href="#link">Previsioni per 5 giorni</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default TopBar;
