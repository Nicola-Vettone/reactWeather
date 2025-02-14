import { useEffect, useState } from "react";
import { Card, CardImg, Spinner } from "react-bootstrap";

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
    <Card>
      <Card.Body>
        <Card.Img
          variant="top"
          src="https://static01.nyt.com/images/2014/12/11/technology/personaltech/11machin-illo/11machin-illo-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale"
        />
        <Card.Title>Meteo Napoli</Card.Title>
        <Card.Text>
          {weather && (
            <div>
              <h5>Temperatura: {celsius(weather.main.temp)}°C</h5>
              <h5>Temperatura min: {weather.main.temp_min}</h5>
              <h5>Temperatura max: {weather.main.temp_max}</h5>
              <h5>Condizioni: {weather.weather[0].description}</h5>
              <h5>Umidità: {weather.main.humidity}</h5>
            </div>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Weather;
