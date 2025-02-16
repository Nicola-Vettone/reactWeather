import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router";

function Info() {
  const { city } = useParams();
  return (
    <Card className="mt-3 back">
      <Card.Header>
        <strong>Legenda:</strong>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <i className="bi bi-thermometer icon"></i> <strong>Temperatura Minima</strong>
        </Card.Text>
        <Card.Text>
          <i className="bi bi-thermometer-high icon"></i> <strong>Temperatura Massima</strong>
        </Card.Text>
        <Card.Text>
          <i className="bi bi-cloud icon"></i> <strong>Cielo</strong>
        </Card.Text>
        <Card.Text>
          <i className="bi icon bi-moisture"></i> <strong>Umidità</strong>
        </Card.Text>
        <Card.Text>
          <i className="icon bi bi-eye"></i> <strong>Visibilità</strong>
        </Card.Text>
        <Card.Text>
          <i className="bi bi-cloud-fog2 icon"></i> <strong>% di nuvole</strong>
        </Card.Text>
        <Card.Text>
          <i className="bi icon bi-wind"></i> <strong>Velocità del vento</strong>
        </Card.Text>
        <Card.Text>
          <i className="bi icon bi-water"></i> <strong>Pressione atmosferica sul livello del mare</strong>
        </Card.Text>
        <Card.Text>
          <i className="bi bi-sunrise icon"></i> <strong>Alba</strong>
        </Card.Text>
        <Card.Text>
          <i className="bi bi-sunset icon"></i> <strong>Tramonto</strong>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link to={`/weather/${city}`} className="btn btn-danger">
          Chiudi
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default Info;
