import React from 'react';
import cloudyIcon from '../../Assets/weatherAssets/clouds.svg'; 
import sunnyIcon from '../../Assets/weatherAssets/sunny-weather.svg'; 
import rainyIcon from '../../Assets/weatherAssets/rainy-weather.svg'; 
import { useDarkMode } from '../DarkModeContext/DarkModeContext';
import thunderIcon from "../../Assets/weatherAssets/cloud-thunder.svg"
import clearIcon from "../../Assets/weatherAssets/clear.svg";
// Function to determine the weather icon based on the weather main description
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

// Function to convert temperature from Kelvin to Celsius
const kelvinToCelsius = (temp) => {
  return Math.round(temp - 273.15);;
};

// Function to filter out unique dates and limit to five entries
const getUniqueDates = (data) => {
  const uniqueDatesMap = new Map();
  data.forEach(forecast => {
    const date = new Date(forecast.dt_txt).toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    });
    if (!uniqueDatesMap.has(date)) {
      uniqueDatesMap.set(date, forecast);
    }
  });
  return Array.from(uniqueDatesMap.values()).slice(0, 5); // Limit to 5 entries
};

const FiveDayForecast = ({ fiveDayForecast }) => {
  const { isDarkMode } = useDarkMode();

  // Filter to get unique dates and limit to 5 entries
  const filteredForecastData = getUniqueDates(fiveDayForecast);

  // Map the data to create forecast items
  const forecastItems = filteredForecastData.map((forecast) => {
    return {
      icon: getWeatherIcon(forecast.weather[0].main),
      temperature: `${kelvinToCelsius(forecast.main.temp)}°C`,
      date: new Date(forecast.dt_txt).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      }),
    };
  });

  return (
    <div className={`${isDarkMode ? 'bg-darkMode' : 'bg-lightMode'} p-4 rounded-lg mt-4 md:w-[35%] lg:w-[30%]`}>
      <div className="text-xl text-center font-bold mb-2">5 Days Forecast:</div>
      <div className='flex justify-evenly xl:justify-start h-full flex-col'>
        {forecastItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div className="xl:w-[30%]  ">
              <img src={item.icon} alt="Weather Icon" className="w-10 h-10" />
            </div>
            <div className="w-[30%] xl:w-[20%] text-center text-sm lg:text-base">{item.temperature}</div>
            <div className="w-[60%] xl:w-[50%] text-right text-sm lg:text-base">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiveDayForecast;
