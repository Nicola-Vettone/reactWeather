import { BrowserRouter, Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
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
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
