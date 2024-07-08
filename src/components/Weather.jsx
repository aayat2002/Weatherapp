import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import cloudy_icon from "../assets/cloudy.png";
import drizzle_icon from "../assets/drizzle.png";
import snow_icon from "../assets/snow.png";
import sun_icon from "../assets/sun.png";
import wind_icon from "../assets/wind.png";
import rain_icon from "../assets/rain.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": rain_icon,
    "04n": rain_icon,
    "09d": snow_icon,
    "09n": snow_icon,
    "10d": humidity_icon,
    "10n": humidity_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || sun_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        tempreature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("London");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.tempreature}°c</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col1">
              <img src={humidity_icon} alt="" className="humidity-icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col1">
              <img src={wind_icon} alt="" className="wind-icon" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* <img src={weatherData.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.tempreature}°c</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col1">
          <img src={humidity_icon} alt="" className="humidity-icon" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col1">
          <img src={wind_icon} alt="" className="wind-icon" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Weather;
