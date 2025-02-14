import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, Container, Alert } from "react-bootstrap";

const Weather = () => {
  const { city } = useParams(); //Prendo la città dal path
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  function celsius(kelvin) {
    return (kelvin - 273.15).toFixed(2); //funzione che converte i kelvin in celsius
  }

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const API_key = "5f02cb891ca7b88e0d939cb4f34405d8";
        const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`); //fetch per prendere lat e lon
        const data = await resp.json();

        const latitude = data[0].lat;
        const longitude = data[0].lon;

        const weatherResult = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}` //fetch che prende i dati delle città
        );
        const data2 = await weatherResult.json(); //da cambiare nome a data2
        setWeather(data2);
      } catch (error) {
        console.log("Errore", error);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]); //cambia la city in base all'update dello state

  return (
    <Container>
      {loading && <Alert>Caricamento...</Alert>}

      {weather && (
        <Card className="text-center bg-primary text-white mt-3">
          <Card.Body>
            <Card.Title>
              <Card.Img
                variant="top"
                className="w-25"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
              {city.toLocaleUpperCase()}
            </Card.Title>
            <Card.Text>
              <div>
                <strong>Temperatura:</strong> {celsius(weather.main.temp)}°C
              </div>
              <div>
                <strong>Temperatura min:</strong> {celsius(weather.main.temp_min)}°C
              </div>
              <div>
                <strong>Temperatura max:</strong> {celsius(weather.main.temp_max)}°C
              </div>
              <div>
                <strong>Condizioni:</strong> {weather.weather[0].description}
              </div>
              <div>
                <strong>Umidità:</strong> {weather.main.humidity}%
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Weather;
