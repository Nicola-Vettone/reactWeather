import { BrowserRouter, Route, Routes } from "react-router";
import { Alert, Container } from "react-bootstrap";
import Topbar from "./components/TopBar";
import Home from "./components/Home";
import Weather from "./components/Weather";
import Footer from "./components/Footer";
import FiveDays from "./components/FiveDays";

const App = () => {
  return (
    <BrowserRouter>
      <Topbar />
      <Container fluid>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:city" element={<Weather />} />
          <Route path="/weather/five-days/:city" element={<FiveDays />} />
          <Route
            path="*"
            element={
              <Alert className="mt-3" variant="danger">
                Error 404-pagina non trovata
              </Alert>
            }
          />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
