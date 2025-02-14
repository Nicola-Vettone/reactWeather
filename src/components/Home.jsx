import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const Home = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      navigate(`/weather/${city}`); //mette nel path la citta da visualizzare
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-4 mt-3">
        <Form.Group className="mb-3" controlId="cityInput">
          <Form.Control
            type="text"
            placeholder="Inserisci la città..."
            value={city} //Cambia la città il base all'input che si da
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Cerca</Button>
      </Form>
    </>
  );
};

export default Home;
