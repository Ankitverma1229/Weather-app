import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../DarkModeContext/DarkModeContext';
import { PiStarBold, PiStarFill } from "react-icons/pi";
import { getFavCity, addFavcity } from '../../Services/WeatherServices';

const Header = ({ city }) => {
  const { isDarkMode } = useDarkMode();
  const [isFavCity, setIsFavCity] = useState(false);
  
  useEffect(() => {
    const AllFavCities = async () => {
      const response = await getFavCity();
      if (response.some(favCity => favCity.city === city.name)) {
        setIsFavCity(true);
      } else {
        setIsFavCity(false);
      }
    }
    if (city && city.name) {
      AllFavCities();
    }
  }, [city])

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'short'
  });

  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const addCityToFav = async () => {
    const response = await addFavcity(city.name);
    if(response){
      setIsFavCity(true);
    }
  }

  return (
    <div className={`flex flex-col ${isDarkMode ? 'bg-darkMode' : 'bg-lightMode'}  rounded-md md:w-[35%]  p-4`}>
      <div className='flex justify-end'>
        {isFavCity ?
          (<PiStarFill className="text-2xl text-[#e9cf3c] hover:cursor-pointer" />)
          :
          (
            <PiStarBold className='text-2xl cursor-pointer hover:scale-125 duration-300' onClick={() => addCityToFav()} />
          )
        }

      </div>
      <div className='flex flex-col h-full justify-center items-center '>
        <div className="text-xl md:text-3xl font-bold">{city && city.name}</div>
        <div className="text-3xl md:text-5xl font-extrabold md:mt-5">{time}</div>
        <div className="text-md font-bold">{date}</div>
      </div>

    </div>
  );
};

export default Header;
