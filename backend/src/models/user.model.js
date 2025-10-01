import mongoose , { Schema } from "mongoose";


const userSchema = new Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        lowercase : true,
        unique : true
    },
    clerkId : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    image : {
        type : String,
        required : true
    }
},{ timeseries: true, timestamps: true });


export const User = new mongoose.model("User", userSchema);