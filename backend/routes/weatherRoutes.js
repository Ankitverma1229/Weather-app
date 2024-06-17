import express from 'express';
import {getWeatherDetails,
    createFavouriteCity,
    getFavouriteCities,
    getFavouriteCityById,
    updateFavouriteCityById,
    deleteFavouriteCityById} from "../controller/weatherController.js"

const router = express.Router();

router.get('/weather/:location', getWeatherDetails);

router.post('/favorites', createFavouriteCity);
router.get('/favorites', getFavouriteCities);
router.get('/favorites/:id', getFavouriteCityById);
router.put('/favorites/:id', updateFavouriteCityById);
router.delete('/favorites/:id', deleteFavouriteCityById);

export default router;