import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BackendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

export const getWeatherData = async (location) => {
    if (location) {
        try {
            const response = await axios.get(`${BackendUrl}weather/${location}`);
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.error || "Something went wrong, Enter a correct location.");
            return error.response;
        }
    }
}

export const addFavcity = async (city)=>{
    if(city){
        try {
            const response = await axios.post(`${BackendUrl}favorites`, {city: city});
            toast.success(response?.data?.message);
            return response.data.message;
        } catch (error) {
            toast.error(error.response?.data?.error);
            console.log(error);
        }
    }
}

export const getFavCity = async()=>{
    try {
        const response = await axios.get(`${BackendUrl}favorites`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
   
} 

export const updateFavCity = async(city, id)=>{
    if(city){
        try {
            const response = await axios.put(`${BackendUrl}favorites/${id}`, {city: city});
            toast.success(response?.data?.message);
            return response.data.message;
        } catch (error) {
            toast.error(error.response?.data?.error);
            console.log(error);
        }
    }
}

export const deleteFavCity = async(id)=>{
    try {
        const response = await axios.delete(`${BackendUrl}favorites/${id}`);
        toast.success(response?.data?.message);
        return response.data.message;
    } catch (error) {
        toast.error(error.response?.data?.error);
        console.log(error);
    }
}