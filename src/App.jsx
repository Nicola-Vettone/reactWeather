import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
/* import Weather from "./components/Home"; */
import TopBar from "./components/TopBar";

import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./components/WeatherHome";

const App = () => (
  <BrowserRouter>
    <TopBar />
    <Routes>
      <Route path="/" element={<Weather />} />
      {/*  <Route path="/weather" element={<5Days />} /> */}
      {/* <Route path="/weather/5-days" element={<MovieDetails />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
