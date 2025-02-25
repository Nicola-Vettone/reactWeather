import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Card, Container, Alert } from "react-bootstrap";

const Weather = () => {
  const { city } = useParams(); //Prendo la città dal path
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function celsius(kelvin) {
    return (kelvin - 273.15).toFixed(0); //funzione che converte i kelvin in celsius
  }
  function date(seconds) {
    return new Date(seconds * 1000).toLocaleString(); //funzione che converte la data
  }
  function sunset_sunrise(seconds) {
    return new Date(seconds * 1000).toLocaleString().slice(11); //funzione che converte la data del tramonto
  }
  function visibility(visibility) {
    return (visibility / 1000).toLocaleString().slice(0, 1, 10); //funzione che converte la visibilità
  }
  function speed(speed) {
    return (speed * 3.6).toFixed(0); //funzione per convertire i metri al secondo in km/h
  }

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const API_key = "5f02cb891ca7b88e0d939cb4f34405d8";
        const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`); //fetch per prendere lat e lon
        const data = await resp.json();

        console.log(data.length);

        if (data.length === 0) {
          setError(`Nessuna città corrispondente!`);
          setLoading(false);
          return;
        } else {
          setError(null);
        }
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
      {loading && <Alert variant="warning">Caricamento...</Alert>}

      {error && (
        <div>
          <Alert variant="danger" className="mt-2">
            {error}
          </Alert>
          <Link to="/" className=" btn btn-primary d-flex justify-content-center px-0">
            Ritorna alla Home
          </Link>
        </div>
      )}

      {weather && (
        <>
          <h1 className="text-center city text-white">
            {city.toLocaleUpperCase()} ({weather.sys.country})
          </h1>
          <h2 className="text-center text-white">{date(weather.dt)}</h2>

          <Card className=" text-white mt-3 noBorder">
            <Card.Body className=" backInfo ">
              <div className="d-flex flex-row-reverse me-1">
                <Link to={`/weather/info/${city}`}>
                  <i className="bi bi-info-circle icon text-white"></i>
                </Link>
              </div>
              <Card.Title>
                <div className=" d-flex justify-content-center align-item-center">
                  <div className="size">{celsius(weather.main.temp)}°</div>
                  <Card.Img
                    variant="top"
                    className="iconImg"
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  />
                </div>
              </Card.Title>

              <Card.Text>
                <Container className="w-50 font_text d-flex gap-4 justify-content-center">
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
            <Card.Body className=" back  back2">
              <Card.Text>
                <Container className="font_text d-flex gap-5 justify-content-center">
                  <div>
                    <i className="icon bi bi-eye"></i> {visibility(weather.visibility)} km
                  </div>
                  <div>
                    <i className="bi bi-cloud-fog2 icon"></i> {weather.clouds.all} %
                  </div>
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className=" text-white mt-3 noBorder">
            <Card.Body className=" back  back2">
              <Card.Text>
                <Container className="font_text d-flex gap-5 justify-content-center">
                  <div>
                    <i className="bi icon bi-wind"></i> {speed(weather.wind.speed)} km/h
                  </div>
                  <div>
                    <i className="bi icon bi-water"></i> {weather.main.sea_level} mt
                  </div>
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className=" text-white mt-3 noBorder">
            <Card.Body className=" back back2 ">
              <Card.Text>
                <Container className="font_text d-flex gap-5 justify-content-center">
                  <div>
                    <i className="bi bi-sunrise icon"></i> {sunset_sunrise(weather.sys.sunset)}
                  </div>
                  <div>
                    <i className="bi bi-sunset icon"></i> {sunset_sunrise(weather.sys.sunrise)}
                  </div>
                </Container>
              </Card.Text>
            </Card.Body>
          </Card>
          <div className="d-flex justify-content-center">
            <Link to={`/weather/five-days/${city}`} className="mt-5 btn btn-primary shadow">
              Maggiori Dettagli
            </Link>
          </div>
        </>
      )}
    </Container>
  );
};

export default Weather;
