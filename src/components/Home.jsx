import { useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const Home = () => {
  const [city, setCity] = useState("");
  const [popularCities, setPopularCities] = useState([]);
  const navigate = useNavigate();
  const API_key = "5f02cb891ca7b88e0d939cb4f34405d8";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      navigate(`/weather/${city}`);
    }
  };

  useEffect(() => {
    const fetchWeatherForCities = async () => {
      const cities = [
        "New York",
        "Londra",
        "Tokyo",
        "Parigi",
        "Sydney",
        "Berlino",
        "Dubai",
        "Mosca",
        "Roma",
        "Milano",
        "Napoli",
        "Genova",
      ];
      const fetchedCities = await Promise.all(
        cities.map(async (city) => {
          try {
            const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);
            const data = await resp.json();
            return { name: city, temp: (data.main.temp - 273.15).toFixed(0), icon: data.weather[0].icon };
          } catch (error) {
            console.log(`Errore nel caricamento di ${city}`, error);
            return { name: city, temp: "N/A", icon: "" };
          }
        })
      );
      setPopularCities(fetchedCities);
    };

    fetchWeatherForCities();
  }, []);

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-4 mt-3">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Inserisci città..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Cerca</Button>
      </Form>
      <Container>
        <h3 className="text-center">Grandi metropoli nel mondo:</h3>
        <div className="d-flex flex-wrap justify-content-center">
          {popularCities.map((city, index) => (
            <Card key={"city" + index} className="m-2 text-center noBorder ">
              <Card.Body className="back ">
                <Card.Title>{city.name}</Card.Title>
                {city.icon && (
                  <Card.Img
                    variant="top"
                    src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
                    className="w-50 mx-auto"
                  />
                )}
                <Card.Text>{city.temp}°C</Card.Text>
                <Button variant="primary" onClick={() => navigate(`/weather/${city.name}`)}>
                  Vedi Meteo
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
