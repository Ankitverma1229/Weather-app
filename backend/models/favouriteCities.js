import mongoose from 'mongoose';

const favouriteCitySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    });

export default mongoose.model('FavouriteCity', favouriteCitySchema);
