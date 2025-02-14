import { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  function celsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
  }

  const weatherFetch = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const API_key = "5f02cb891ca7b88e0d939cb4f34405d8";
      const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`);
      const data = await resp.json();

      if (!data[0]) return;

      const latitude = data[0].lat;
      const longitude = data[0].lon;

      const weatherResult = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`
      );
      const data2 = await weatherResult.json();
      setWeather(data2);
    } catch (error) {
      console.log("Errore", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    weatherFetch();
  };

  return (
    <Container>
      <h1 className="text-center mb-4">Controlla le previsioni del Meteo:</h1>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3" controlId="cityInput">
          <Form.Control
            type="text"
            placeholder="Inserisci la città..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Cerca</Button>
      </Form>

      {loading && <Alert>Inserisci il nome di una città </Alert>}

      {weather && (
        <Card>
          <Card.Body>
            <Card.Img
              variant="top"
              src="https://static01.nyt.com/images/2014/12/11/technology/personaltech/11machin-illo/11machin-illo-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale"
            />
            <Card.Title>Meteo per {city}</Card.Title>
            <Card.Text>
              <p>
                <strong>Temperatura:</strong> {celsius(weather.main.temp)}°C
              </p>
              <p>
                <strong>Temperatura min:</strong> {celsius(weather.main.temp_min)}°C
              </p>
              <p>
                <strong>Temperatura max:</strong> {celsius(weather.main.temp_max)}°C
              </p>
              <p>
                <strong>Condizioni:</strong> {weather.weather[0].description}
              </p>
              <p>
                <strong>Umidità:</strong> {weather.main.humidity}%
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Weather;
