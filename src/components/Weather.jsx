import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Card, Container, Alert } from "react-bootstrap";

const Weather = () => {
  const { city } = useParams(); //Prendo la città dal path
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  function celsius(kelvin) {
    return (kelvin - 273.15).toFixed(0); //funzione che converte i kelvin in celsius
  }
  function date(seconds) {
    return new Date(seconds * 1000).toLocaleString(); //funzione che converte la data
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
          <h1 className="text-center city text-white">{city.toLocaleUpperCase()}</h1>
          <h2 className="text-center text-white">{date(weather.dt)}</h2>
          <Card className=" text-white mt-3 noBorder">
            <Card.Body className=" back ">
              <Card.Title>
                <div className=" d-flex justify-content-center align-item-center">
                  <div className="size">{celsius(weather.main.temp)}°</div>
                  <Card.Img
                    variant="top"
                    className="w-25"
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  />
                </div>
              </Card.Title>

              <Card.Text>
                <Container className="w-50 font_text">
                  <div>
                    <i className="bi bi-thermometer icon"></i> {celsius(weather.main.temp_min)}°
                  </div>
                  <div>
                    <i className="bi bi-thermometer-high icon"></i> {celsius(weather.main.temp_max)}°
                  </div>
                  <div>
                    <i className="bi bi-cloud icon"></i> {weather.weather[0].description}
                  </div>
                  <div>
                    <i className="bi icon bi-moisture"> </i>
                    {weather.main.humidity}%
                  </div>
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className=" text-white mt-3 noBorder">
            <Card.Body className=" back ">
              <Card.Text>
                <Container className="w-50 font_text">
                  <div>
                    <i className="bi icon bi-wind"></i> {celsius(weather.wind.speed)} km/h
                  </div>
                  <div>
                    <i className="bi icon bi-water"></i> {celsius(weather.main.sea_level)} mt
                  </div>
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
          <div className="d-flex justify-content-center">
            <Link to={`/weather/five-days/${city}`} className="mt-5 btn btn-primary">
              Maggiori Dettagli
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default Weather;
