import { BrowserRouter, Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import Topbar from "./components/TopBar";
import Home from "./components/Home";
import Weather from "./components/Weather";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <Topbar />
      <Container fluid>
        <h1 className="text-center mb-4">Le migliori previsioni del Meteo per:</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:city" element={<Weather />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
