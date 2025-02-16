import Modal from "react-bootstrap/Modal";
import { Link } from "react-router";

function Info() {
  return (
    <div className="modal show" style={{ display: "block", position: "initial" }}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Legenda:</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <i className="bi bi-thermometer icon"></i> <strong>Temperatura Minima</strong>
          </p>
          <p>
            <i className="bi bi-thermometer-high icon"></i> <strong>Temperatura Massima</strong>
          </p>
          <p>
            <i className="bi bi-cloud icon"></i> <strong>Cielo</strong>
          </p>
          <p>
            <i className="bi icon bi-moisture"></i> <strong>Umidità</strong>
          </p>
          <p>
            <i className="icon bi bi-eye"></i> <strong>Visibilità</strong>
          </p>
          <p>
            <i className="bi bi-cloud-fog2 icon"></i> <strong>% di nuvole</strong>
          </p>
          <p>
            <i className="bi icon bi-wind"></i> <strong>Velocità del vento</strong>
          </p>
          <p>
            <i className="bi icon bi-water"></i> <strong>Pressione atmosferica sul livello del mare</strong>
          </p>
          <p>
            <i className="bi bi-sunrise icon"></i> <strong>Alba</strong>
          </p>
          <p>
            <i className="bi bi-sunset icon"></i> <strong>Tramonto</strong>
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link to={"/weather/:city"} className="btn btn-danger">
            Chiudi
          </Link>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Info;
