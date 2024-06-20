import React, { useState, useCallback } from 'react';
import { useDarkMode } from '../DarkModeContext/DarkModeContext';
import { BiSolidEdit } from "react-icons/bi";
import { FcFullTrash } from "react-icons/fc";
import { updateFavCity, deleteFavCity } from '../../Services/WeatherServices';

const FavCities = ({ favCities, getAllFavCities, setShowFavCities, setLocation, fetchWeatherData }) => {
    const { isDarkMode } = useDarkMode();
    const [editState, setEditState] = useState({ editIndex: null, newCityName: "" });

    const handleEdit = useCallback((index, cityName) => {
        setEditState({ editIndex: index, newCityName: cityName });
    }, []);

    const handleUpdate = useCallback(async (id) => {
        await updateFavCity(editState.newCityName, id);
        setEditState({ editIndex: null, newCityName: "" });
        await getAllFavCities();
        setShowFavCities(true);
    }, [editState.newCityName, getAllFavCities, setShowFavCities]);

    const handleKeyPress = useCallback((e, id) => {
        if (e.key === 'Enter') {
            handleUpdate(id);
        }
    }, [handleUpdate]);

    const handleDelete = useCallback(async (id) => {
        await deleteFavCity(id);
        await getAllFavCities();
        setShowFavCities(true);
        fetchWeatherData();
    }, [getAllFavCities, setShowFavCities]);

    return (
        <div className={`${isDarkMode ? 'bg-darkMode' : 'bg-lightMode'} max-h-[200px] w-[300px] space-y-3 scroll-m-2 overflow-auto p-4 rounded-md`} onClick={(e)=>e.stopPropagation()}>
            {favCities.map((cityData, index) => (
                <div key={index}>
                    <div className='flex justify-between items-center'>
                        {editState.editIndex === index ? (
                            <input
                                className="text-lg bg-transparent border-b-2 outline-none"
                                value={editState.newCityName}
                                onChange={(e) => setEditState({ ...editState, newCityName: e.target.value })}
                                onKeyPress={(e) => handleKeyPress(e, cityData._id)}
                                autoFocus
                            />
                        ) : (
                            <p className='text-lg cursor-pointer duration-300 hover:scale-110' onClick={() => setLocation(cityData.city)}>{cityData.city}</p>
                        )}
                        <div className='flex gap-4 items-center text-lg'>
                            <BiSolidEdit
                                className='cursor-pointer duration-300 hover:scale-150'
                                onClick={() => handleEdit(index, cityData.city)}
                            />
                            <FcFullTrash
                                className='cursor-pointer duration-300 hover:scale-150'
                                onClick={() => handleDelete(cityData._id)}
                            />
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default FavCities;
