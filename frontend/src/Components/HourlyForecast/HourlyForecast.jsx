import React, { useState, useEffect } from "react";
import sunnyIcon from "../../Assets/weatherAssets/sunny-weather.svg"; 
import cloudyIcon from "../../Assets/weatherAssets/clouds.svg"; 
import rainyIcon from "../../Assets/weatherAssets/rainy-weather.svg";
import clearIcon from "../../Assets/weatherAssets/clear.svg";
import thunderIcon from "../../Assets/weatherAssets/cloud-thunder.svg";
import navigation from "../../Assets/weatherAssets/navigation.svg";
import navigation2 from "../../Assets/weatherAssets/navigation2.svg";
import navigation3 from "../../Assets/weatherAssets/navigation3.svg";
import { useDarkMode } from '../DarkModeContext/DarkModeContext';

const getWeatherIcon = (weatherMain) => {
  switch (weatherMain) {
    case 'Clear':
      return clearIcon;
    case 'Clouds':
      return cloudyIcon;
    case 'Rain':
    case 'Drizzle':
      return rainyIcon;
    case 'Thunderstorm':
      return thunderIcon;  
    default:
      return sunnyIcon;
  }
};

const kelvinToCelsius = (temp) => {
  return Math.round(temp - 273.15);
};

const HourlyForecast = ({ hourlyForecast }) => {
  const { isDarkMode } = useDarkMode();

  const currentDateTime = new Date();

  const filteredHourlyData = hourlyForecast
    .filter(forecast => new Date(forecast.dt_txt) >= currentDateTime)
    .sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt)) 
    .slice(0, 5)
    .map(forecast => ({
      time: new Date(forecast.dt_txt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      icon: getWeatherIcon(forecast.weather[0].main),
      temperature: kelvinToCelsius(forecast.main.temp),
      wind: forecast.wind.speed,
      weatherMain: forecast.weather[0].main 
    }));

  const navigationIcons = [navigation, navigation3, navigation, navigation2];


  const getNavigationIcon = (index) => {
    return navigationIcons[index % navigationIcons.length];
  };

  return (
    <div className={`${isDarkMode ? 'bg-darkMode' : 'bg-lightMode'} p-2 md:p-4 rounded-lg mt-4 md:w-[60%] xl:w-[65%]`}>
      <div className="text-xl font-bold mb-4 text-center">Hourly Forecast:</div>
      <div className="flex flex-col xl:flex-row gap-2 xl:gap-0 justify-around ">
        {filteredHourlyData.map((forecast, index) => (
          <div key={index} className={`${isDarkMode ? "bg-[#373636]" : (['Rain', 'Drizzle', 'Thunderstorm'].includes(forecast.weatherMain) ? 'bg-dark-forecast-gradient' : 'bg-light-forecast-gradient')} text-center xl:h-56 flex xl:flex-col items-center justify-around p-2 xl:p-4 rounded-3xl`}>
            <div className="font-semibold xl:text-lg">{forecast.time}</div>
            <div className="w-10 h-10 xl:w-16 xl:h-16 mx-auto">
              <img src={forecast.icon} alt="Weather Icon" className="w-full h-full" />
            </div>
            <div className="font-semibold text-sm md:text-base">{forecast.temperature}°C</div>
            <div className="w-5 h-5 xl:w-8 xl:h-8 mx-auto">
              <img src={getNavigationIcon(index)} alt="Air Direction" className="w-full h-full" />
            </div>
            <div className="font-semibold text-sm md:text-base">{forecast.wind}km/h</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
