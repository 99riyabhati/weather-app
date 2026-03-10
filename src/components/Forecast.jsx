import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API_KEY = "a315c84232da97e2aea6c31e77bfb4ef";

const Forecast = () => {
  const location = useLocation();
  const city = location.state?.city || "Delhi";

  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );

        const dailyData = res.data.list.filter((item, index) => index % 8 === 0);

        setForecast(dailyData);
      } catch (error) {
        alert("City not found");
      }
    };

    fetchForecast();
  }, [city]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        5-Day Forecast for {city}
      </h2>

      {forecast.map((item) => (
        <div
          key={item.dt}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
            background: "#ffffff",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <p>
            {new Date(item.dt_txt).toLocaleDateString()}
          </p>

          <img
            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
            style={{ width: "50px", height: "50px" }}
          />

          <p>{item.main.temp}°C</p>

          <p style={{ textTransform: "capitalize" }}>
            {item.weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;