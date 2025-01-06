import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Clear_day from "../assets/images/clear-day.svg";
import Fog from "../assets/images/fog.svg";
import Wind from "../assets/images/wind.svg";
import Clear_night from "../assets/images/clear-night.svg";
import Cloudy_day from "../assets/images/cloudy-1-day.svg";
import Cloudy_night from "../assets/images/cloudy-1-night.svg";
import Cloudy from "../assets/images/cloudy.svg";
import drizzle from "../assets/images/rainy-1-day.svg";
import drizzle_night from "../assets/images/rainy-1-night.svg";
import rainy from "../assets/images/rainy-3.svg";
import rainy_night from "../assets/images/rainy-3-night.svg";
import snow_day from "../assets/images/snowy-1-day.svg";
import snow_night from "../assets/images/snowy-1-night.svg";

const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": Clear_day,
    "01n": Clear_night,
    "02d": Cloudy_day,
    "02n": Cloudy_night,
    "03d": Cloudy,
    "03n": Cloudy,
    "04d": drizzle,
    "04n": drizzle_night,
    "09d": rainy,
    "09n": rainy_night,
    "10n": rainy_night,
    "13d": snow_day,
    "13n": snow_night,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || Clear_day;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="grid place-items-center min-h-screen">
      <div
        className="border-2 w-80 h-96 rounded-md border-blue-500 "
       

       
/>
        <div className="flex">
          <div className="pl-6 pt-4">
            <input
              ref={inputRef}
              type="text"
              placeholder="search "
              className="pl-4 h-9 w-52 rounded-full"
            />
          </div>
          {/* search icon */}
          <div className="bg-white w-9 h-9 grid place-items-center mt-4 ml-2 rounded-full">
            <FaSearch
              onClick={() => {
                search(inputRef.current.value);
              }}
            />
          </div>
        </div>
        {/* images start */}
        <div className="flex place-items-center justify-center">
          <img
            src={weatherData.icon}
            alt=""
            srcSet=""
            className="h-28 w-32  mt-12"
          />
        </div>
        {/* images section end */}
        {/* paragraph section start */}
        <div className="flex flex-col gap-2 place-items-center text-2xl font-bold mb-5">
          <p>{weatherData.temperature}°C</p>
          <p>{weatherData.location}</p>
        </div>
        {/* paragraph section end */}
        {/* humidity and wind speed section */}
        <div className="flex justify-between pl-2 pr-2">
          {/* for humidity */}
          <div className="flex gap-1">
            <div>
              <img src={Fog} alt="" srcSet="" />
            </div>
            <div className="pt-2 font-semibold ">
              <p>{weatherData.humidity}%</p>
              <p className="text-xs">Humidity</p>
            </div>
          </div>
          {/* for windspeed */}
          <div className="flex">
            <div>
              <img src={Wind} alt="" srcSet="" />
            </div>
            <div className="pt-2 font-semibold ">
              <p>{weatherData.windSpeed}Km/h</p>
              <p className="text-xs">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
