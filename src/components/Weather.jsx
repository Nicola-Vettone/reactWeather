import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, Container, Alert } from "react-bootstrap";

const Weather = () => {
  const { city } = useParams(); //Prendo la città dal path
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  function celsius(kelvin) {
    return (kelvin - 273.15).toFixed(0); //funzione che converte i kelvin in celsius
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
        <>
          <h1 className="text-center city text-white"> {city.toLocaleUpperCase()}</h1>
          <Card className="text-center text-white mt-3 noBorder">
            <Card.Body className=" back ">
              <Card.Title>
                <div className=" d-flex justify-content-center">
                  <div className="size">{celsius(weather.main.temp)}°</div>
                  <Card.Img
                    variant="top"
                    className="w-25"
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  />
                </div>
              </Card.Title>

              <Card.Text>
                <div>Min: {celsius(weather.main.temp_min)}°</div>
                <div>Max: {celsius(weather.main.temp_max)}°</div>
                <div>Condizioni: {weather.weather[0].description}</div>
                <div>Umidità: {weather.main.humidity}%</div>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-center bg-primary text-white mt-3 noBorder">
            <Card.Body className=" back">
              <Card.Text>
                <div>{celsius(weather.main.temp)}°</div>
                <div>Min: {celsius(weather.main.temp_min)}°</div>
                <div>Max: {celsius(weather.main.temp_max)}°</div>
                <div>Condizioni: {weather.weather[0].description}</div>
                <div>Umidità: {weather.main.humidity}%</div>
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Weather;
