import React, { useState } from "react";
import CustomizedSwitches from "../TogglerButton/SwitchButton";
import searchIcon from "../../Assets/weatherAssets/searchIcon.svg";
import currentLocation from "../../Assets/weatherAssets/currentLocation.svg";
import { useDarkMode } from "../DarkModeContext/DarkModeContext";
import { PiStarFill } from "react-icons/pi";
import { getFavCity } from "../../Services/WeatherServices";
import FavCities from "../FavCities/FavCities";

const Navbar = ({ setLocation, fetchCity, fetchWeatherData, setShowFavCities, showFavCities}) => {
  const { isDarkMode } = useDarkMode();
  const [locationInput, setLocationInput] = useState("");
  const [favCities, setFavCities] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setLocation(locationInput);
      setLocationInput("");
    }
  };

  const getAllFavCities = async () => {
    const response = await getFavCity();
    setFavCities(response);
    setShowFavCities(!showFavCities);
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row items-center justify-around mb-5">
    <div className="hidden md:block">
    <CustomizedSwitches />

    </div>

      <div className="flex w-full justify-between items-center md:hidden">
      <CustomizedSwitches />
      <div
        className="flex gap-2 items-center px-3 py-2 bg-[#4CBB17] text-white rounded-full hover:cursor-pointer hover:bg-[#3e9913]"
        onClick={() => fetchCity()}
      >
        <div className="h-5 w-5">
          <img
            className="h-full w-full"
            src={currentLocation}
            alt="Current location"
          />
        </div>
        <span className="text-sm" >Current Location</span>
      </div>
      </div>

      <div
        className={`shadow-md rounded-full py-2 w-full md:w-[60%] px-5 flex justify-start items-center ${isDarkMode ? "bg-darkMode" : "bg-lightMode"
          } relative`}
      >

        <div className="h-5 w-5">
          <img className="h-full w-full" src={searchIcon} alt="Search icon" />
        </div>
        <input
          className={`${isDarkMode
              ? "bg-darkMode placeholder-white"
              : "bg-lightMode placeholder-gray-600"
            } px-5 w-full hover:outline-none`}
          type="text"
          placeholder="Enter any location"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <PiStarFill className="text-3xl text-[#e9cf3c] hover:cursor-pointer hover:scale-125 duration-300" onClick={() => getAllFavCities()} />
        {favCities.length>0 && showFavCities
          ?
          <div className="absolute right-0 md:-right-10 top-12 shadow-md duration-100 ">
            <FavCities favCities={favCities} getAllFavCities= {getAllFavCities} setShowFavCities={setShowFavCities} setLocation = {setLocation} fetchWeatherData={fetchWeatherData} />
          </div>
          :
          null
        }

      </div>

      <div
        className="hidden md:flex gap-2 items-center px-5 py-2 bg-[#4CBB17] text-white rounded-full hover:cursor-pointer hover:bg-[#3e9913]"
        onClick={() => fetchCity()}
      >
        <div className="h-5 w-5">
          <img
            className="h-full w-full"
            src={currentLocation}
            alt="Current location"
          />
        </div>
        <span>Current Location</span>
      </div>
    </div>
  );
};

export default Navbar;
