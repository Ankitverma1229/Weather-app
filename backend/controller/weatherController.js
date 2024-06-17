import axios from "axios";
import FavouriteCity from "../models/favouriteCities.js";

export const getWeatherDetails = async (req, res) => {
    const { location } = req.params;

    if (!location) {
        return res.status(400).json({ error: "Enter any location." });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=e67718755462556fa67b7b78ea430f3d`);

        if (response) {
            return res.status(200).json(response.data);
        } else {
            return res.status(400).json({ error: "Enter a correct location." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong, Enter a correct location." });
    }
};


export const createFavouriteCity = async (req, res) => {
    try {
        const { city } = req.body;
        const existingCity = await FavouriteCity.findOne({ city });
        if (existingCity) {
            return res.status(400).json({ message: "City is already in favourites" });
        }
        const newCity = new FavouriteCity({ city });
        await newCity.save();
        res.status(201).json({message: "City added to favourites", city:newCity});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getFavouriteCities = async (req, res) => {
    try {
        const cities = await FavouriteCity.find();
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getFavouriteCityById = async (req, res) => {
    try {
        const city = await FavouriteCity.findById(req.params.id);
        if (!city) return res.status(404).json({ message: 'City not found' });
        res.json(city);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateFavouriteCityById = async (req, res) => {
    try {
        const { city } = req.body;
        const updatedCity = await FavouriteCity.findByIdAndUpdate(
            req.params.id,
            { city },
            { new: true }
        );
        if (!updatedCity) return res.status(404).json({ message: 'City not found' });
        res.json({message: "City updated successfully",updatedCity});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteFavouriteCityById = async (req, res) => {
    try {
        const city = await FavouriteCity.findByIdAndDelete(req.params.id);
        if (!city) return res.status(404).json({ message: 'City not found' });
        res.json({ message: 'City deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

