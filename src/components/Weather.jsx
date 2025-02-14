import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  function celsius(kelvin) {
    return kelvin - 273.15;
  }

  useEffect(() => {
    const weatherFetch = async () => {
      try {
        const API_key = "5f02cb891ca7b88e0d939cb4f34405d8";
        const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=napoli&appid=${API_key}`);
        const data = await resp.json();

        const latitude = data[0].lat;
        const longitude = data[0].lon;

        const weatherResult = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`
        );
        const data2 = await weatherResult.json();
        setWeather(data2);
      } catch (error) {
        console.log("Errore nel caricamento dei dati meteo", error);
      } finally {
        setLoading(false);
      }
    };

    weatherFetch();
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Meteo Napoli</Card.Title>
        <Card.Text>
          {weather && (
            <>
              <div>Temperatura: {celsius(weather.main.temp)}°C</div>
              <div>Condizioni: {weather.weather[0].description}</div>
            </>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Weather;
