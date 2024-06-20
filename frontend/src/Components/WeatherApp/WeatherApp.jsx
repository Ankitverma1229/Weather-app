import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import FiveDayForecast from "../FiveDayForecast/FiveDayForecast";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DarkModeProvider, useDarkMode } from "../DarkModeContext/DarkModeContext";
import { getWeatherData } from "../../Services/WeatherServices";

const WeatherApp = () => (
  <DarkModeProvider>
    <WeatherAppContent />
  </DarkModeProvider>
);

const WeatherAppContent = () => {
  const { isDarkMode } = useDarkMode();
  const [weather, setWeather] = useState(null);
  const [latestWeather, setLatestWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [showFavCities, setShowFavCities] = useState(false);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  useEffect(() => {
    fetchCity();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await getWeatherData( location);

      if (response?.status === 500) {
        fetchCity();
      } else {
        setWeather(response);
        const nearestWeatherData = findNearestWeatherData(response.list);
        setLatestWeather(nearestWeatherData);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Error fetching weather data, please try again.");
    }
  };

  const fetchCity = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const city = await reverseGeocode(latitude, longitude);
      setLocation(city);
    } catch (error) {
      console.error("Error fetching city:", error);
      toast.error("Error fetching city data, please try again.");
    }
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const reverseGeocode = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    return data.address.city;
  };

  const findNearestWeatherData = (weatherList) => {
    const currentTime = Math.floor(Date.now() / 1000);
    return weatherList.reduce((nearest, current) => {
      return Math.abs(current.dt - currentTime) < Math.abs(nearest.dt - currentTime)
        ? current
        : nearest;
    }, weatherList[0]);
  };

  return (
    <div className={`${ isDarkMode ? "text-white bg-dark-gradient" : "text-black bg-light-gradient" } min-h-screen flex flex-col justify-around py-5 px-2 xl:px-10 transition-colors`} onClick={() => setShowFavCities(false)}>
    <Navbar setLocation={setLocation} fetchCity={fetchCity} fetchWeatherData={fetchWeatherData} setShowFavCities={setShowFavCities} showFavCities={showFavCities} />

    <div className="flex flex-col ">
      <div className="flex flex-col md:flex-row justify-around">
        {weather && <Header city={weather.city} />}
        {weather && <CurrentWeather currentWeather={latestWeather} city={weather.city} />}
      </div>
      <div className="flex flex-col md:flex-row justify-around">
       {weather && <FiveDayForecast fiveDayForecast={weather.list} />}
       {weather && <HourlyForecast hourlyForecast = {weather.list}/>}
      </div>
    </div>
     
    </div>
  );
};

export default WeatherApp;
