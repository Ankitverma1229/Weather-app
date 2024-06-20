import mongoose from "mongoose";

const totalCountSchema = new mongoose.Schema({
    count: {
        type: Number,
        required: true,
        default: 0
    },
    location: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model("UserCount", totalCountSchema);
