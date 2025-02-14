const Weather = () => {
  const API_key = "5f02cb891ca7b88e0d939cb4f34405d8";

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=40.8358846&lon=40.8358846&appid=${API_key}`);
};

export default Weather;
