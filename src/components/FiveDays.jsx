import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, Container, Alert, Badge } from "react-bootstrap";

const FiveDays = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  function celsius(kelvin) {
    return (kelvin - 273.15).toFixed(0);
  }

  function date(seconds) {
    return new Date(seconds * 1000).toLocaleString().slice(0, 10);
  }

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const API_key = "5f02cb891ca7b88e0d939cb4f34405d8";
        const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`);
        const data = await resp.json();

        const latitude = data[0].lat;
        const longitude = data[0].lon;

        const weatherResult = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`
        );
        const weatherData = await weatherResult.json();
        setWeather(weatherData);

        const forecastResult = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_key}`
        );
        const forecastData = await forecastResult.json();

        const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0); //operatore modulo usato perchè dava previsioni ogni 3 e quindi 8 per ogni giorno,così facendo ne da 1 per ogni giorno
        setForecast(dailyForecast);
      } catch (error) {
        console.log("Errore", error);
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  return (
    <Container className="mb-3">
      {loading && <Alert>Caricamento...</Alert>}

      {weather && forecast && (
        <div className="mt-4 mb-3">
          <h3 className="text-center text-white mb-3"> {city.toLocaleUpperCase()} i prossimi 5 giorni:</h3>
          {forecast.map((day) => (
            <Card key={day.dt} className="text-white mt-3 noBorder">
              <Card.Body className="back">
                <Badge className="badgeSize">{date(day.dt)}</Badge>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center"></div>
                  <Container className="font_text">
                    <div>
                      <i className="bi bi-thermometer icon"></i> {celsius(day.main.temp_min)}°
                    </div>
                    <div>
                      <i className="bi bi-thermometer-high icon"></i> {celsius(day.main.temp_max)}°
                    </div>
                    <div>
                      <i className="bi bi-cloud icon"></i> {day.weather[0].description}
                    </div>
                    <div>
                      <i className="bi icon bi-moisture"></i> {day.main.humidity}%
                    </div>
                  </Container>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default FiveDays;
