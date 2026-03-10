import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Weather.css";

// Weather images
import weatherImage from "../images/Sun.jpg";
import clearImg from "../images/ClearSky.jpg";
import rainImg from "../images/rainy.jpg";
import cloudImg from "../images/cloud.jpg";
import snowImg from "../images/snow.jpg";
import thunderImg from "../images/thunder.jpg";

const API_KEY = "a315c84232da97e2aea6c31e77bfb4ef";

const Weather = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather
  const getWeather = async (searchCity = city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setCity(res.data.name);
    } catch (error) {
      alert("City not found");
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather();
  };

  // Navigate to forecast page
  const goToForecast = () => {
    navigate("/forecast", { state: { city } });
  };

  // Current location weather
  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          setWeather(res.data);
          setCity(res.data.name);
        } catch (error) {
          alert("Unable to fetch location weather");
        }
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  // Weather image logic
  const getWeatherImage = () => {
    if (!weather) return weatherImage;

    const description = weather.weather[0].description.toLowerCase();

    if (description.includes("clear")) return clearImg;
    if (description.includes("cloud")) return cloudImg;
    if (description.includes("rain") || description.includes("drizzle")) return rainImg;
    if (description.includes("snow")) return snowImg;
    if (description.includes("thunder")) return thunderImg;

    return weatherImage;
  };

  const getWeatherIcon = () => {
    if (!weather) return null;
    return `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="card-content">
          
          {/* Left Image */}
          <div className="left-side">
            <img src={getWeatherImage()} alt="Weather Condition" />
          </div>

          {/* Right Side */}
          <div className="right-side">
            
            {/* Search */}
            <form onSubmit={handleSearch} className="search-box">
              <input
                type="text"
                placeholder="Search city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            {/* Buttons */}
            <div
              className="button-group"
              style={{ margin: "15px 0", display: "flex", gap: "10px" }}
            >
              <button onClick={getWeather}>Refresh</button>
              <button onClick={goToForecast}>5-Day Forecast</button>
              <button onClick={getCurrentLocationWeather}>
                Current Location
              </button>
            </div>

            {/* Time */}
            <div className="time">
              <h3>{time.toLocaleTimeString()}</h3>
              <p>{time.toDateString()}</p>
            </div>

            {/* Weather Info */}
            {weather && (
              <>
                <h2>
                  {weather.name}, {weather.sys.country}
                </h2>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img
                    src={getWeatherIcon()}
                    alt={weather.weather[0].description}
                    style={{ width: "60px", height: "60px" }}
                  />
                  <h1 style={{ margin: 0 }}>
                    {weather.main.temp}°C
                  </h1>
                  <span style={{ textTransform: "capitalize" }}>
                    {weather.weather[0].description}
                  </span>
                </div>

                <p>Feels Like: {weather.main.feels_like}°C</p>
                <p>Humidity: {weather.main.humidity}%</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
