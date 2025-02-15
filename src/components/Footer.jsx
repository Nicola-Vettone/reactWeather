import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container fluid className=" text-light colorBack  ">
      <Row>
        <Col xs={6}>
          <Row className="mb-2">
            <Col>
              <a href="https://www.facebook.com/NicolaForzaInter22/?locale=it_IT" target="_blank">
                <i className="bi bi-facebook me-2 text-white"></i>
              </a>
              <a href="https://www.instagram.com/nicolavettone7/" target="_blank">
                <i className="bi bi-instagram me-2 text-white"></i>
              </a>
              <a href="https://x.com/?lang=it&mx=2" target="_blank">
                <i className="bi bi-twitter-x me-2 text-white"></i>
              </a>
            </Col>
          </Row>
          <Row className="text-secondary small"></Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
