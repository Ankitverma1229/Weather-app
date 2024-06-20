import React from 'react';
import { useDarkMode } from '../DarkModeContext/DarkModeContext';
import sunRise from "../../Assets/weatherAssets/sunrise.svg";
import sunSet from "../../Assets/weatherAssets/sunset.svg";
import clear from "../../Assets/weatherAssets/clear.svg";
import clouds from "../../Assets/weatherAssets/clouds.svg";
import humidityImg from "../../Assets/weatherAssets/humidity.svg";
import pressureImg from "../../Assets/weatherAssets/pressure.svg";
import windSpeedImg from "../../Assets/weatherAssets/wind.svg";
import uvImg from '../../Assets/weatherAssets/uv.svg';
import rainy from "../../Assets/weatherAssets/rainy-weather.svg";
import thunder from "../../Assets/weatherAssets/cloud-thunder.svg"



const weatherIcons = {
  "Clear": clear,
  "Clouds": clouds,
  "Rain": rainy,
  "Thunderstorm": thunder
};

const convertUnixToTime = (unixTime, timezoneOffset) => {
  const date = new Date((unixTime + timezoneOffset) * 1000);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  return `${hours % 12 || 12}:${minutes} ${ampm}`;
};

const CurrentWeather = ({ currentWeather, city }) => {

  const { isDarkMode } = useDarkMode();
  const { main, wind, weather: weatherDetails } = currentWeather;
  const { temp, feels_like, humidity, pressure } = main;
  const { main: weatherMain, description, icon } = weatherDetails[0];

  const temperatureCelsius =  Math.round(temp - 273.15);
  const feelsLikeCelsius = Math.round(feels_like - 273.15);
  const windSpeedKmh = Math.round(wind.speed * 3.6);

  const weatherIcon = weatherIcons[weatherMain] || clear;  

  const sunriseTime = convertUnixToTime(city.sunrise, city.timezone);
  const sunsetTime = convertUnixToTime(city.sunset, city.timezone);

  return (
    <div className={`${isDarkMode ? 'bg-darkMode' : 'bg-lightMode'} md:w-[60%] px-5 py-4 rounded-lg flex flex-col lg:flex-row mt-5 md:mt-0 justify-between`}>
      <div className='flex flex-col md:flex-row lg:flex-col gap-2 md:gap-5'>
        <div >
          <p className={`${isDarkMode ? 'dark-gradient-text' : 'light-gradient-text'} text-3xl xl:text-5xl font-semibold`}>{temperatureCelsius} <span>°C</span></p>
          <p className={`${isDarkMode ? 'dark-gradient-text' : 'light-gradient-text'} font-semibold text-lg`}>Feels like: <span className={`${isDarkMode ? 'dark-gradient-text' : 'light-gradient-text'} text-2xl `}>{feelsLikeCelsius}</span>°C</p>
        </div>
        <div className='flex lg:flex-col md:gap-4 justify-between'>
          <div className='flex gap-5 items-center'>
            <div className='h-8'>
              <img className={`${isDarkMode ? '' : 'filter invert'} h-full w-full`} src={sunRise} alt="Sunrise" />
            </div>
            <div className='font-semibold'>
              <p>Sunrise</p>
              <p>{sunriseTime}</p>
            </div>
          </div>
          <div className='flex gap-5 items-center'>
            <div className='h-8'>
              <img className={`${isDarkMode ? '' : 'filter invert'} h-full w-full`} src={sunSet} alt="Sunset" />
            </div>
            <div className='font-semibold'>
              <p>Sunset</p>
              <p>{sunsetTime}</p>
            </div>
          </div>
        </div>
      </div>
<div className='flex flex-col md:flex-row items-center lg:w-[70%]'>
<div className='flex flex-col items-center'>
        <div className='h-40'>
          <img className='h-full w-full' src={weatherIcon || clear} alt={description} />
        </div>
        <p className='text-center text-xl font-semibold'>{description}</p>
      </div>
      <div className='flex flex-wrap items-center justify-between gap-4 md:gap-0 md:justify-end mt-3 xl:mt-0 md:gap-4 md:w-[70%] lg:w-[60%]'>
        <div className='flex flex-col justify-center items-center gap-1'>
          <div className="h-8 w-12 md:h-10 md:w-24">
            <img className={`${isDarkMode ? '' : 'filter invert'} h-full w-full`} src={humidityImg} alt="Humidity" />
          </div>
          <p className='font-semibold text-sm md:text-base'>{humidity}%</p>
          <p className='text-sm md:text-base' >Humidity</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-1'>
          <div className='h-8 w-12 md:h-10 md:w-24'>
            <img className={`${isDarkMode ? '' : 'filter invert'} h-full w-full`} src={windSpeedImg} alt="WindSpeed" />
          </div>
          <p className='font-semibold text-sm md:text-base'>{windSpeedKmh} km/h</p>
          <p className='text-sm md:text-base'>Wind Speed</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-1'>
          <div className="h-8 w-12 md:h-10 md:w-24">
            <img className={`${isDarkMode ? '' : 'filter invert'} h-full w-full`} src={pressureImg} alt="Pressure" />
          </div>
          <p className='font-semibold text-sm md:text-base'>{pressure} hPa</p>
          <p className='text-sm md:text-base'>Pressure</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-1'>
          <div className="h-8 w-12 md:h-10 md:w-24">
            <img className={`${isDarkMode ? '' : 'filter invert'} h-full w-full`} src={uvImg} alt="UV" />
          </div>
          <p className='font-semibold text-sm md:text-base'>8</p> {/* Placeholder, update with actual data if available */}
          <p className='text-sm md:text-base'>UV</p>
        </div>
      </div>
</div>
      
    </div>
  );
};

export default CurrentWeather;
