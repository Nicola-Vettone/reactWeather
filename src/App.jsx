import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
/* import Weather from "./components/Home"; */
import TopBar from "./components/TopBar";

import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./components/Weather";
import Home from "./components/Home";

const App = () => (
  <BrowserRouter>
    <TopBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
      {/*   <Route path="/details/:movieID" element={<MovieDetails />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
