import { resolve } from "dns";

const mongoose=require('mongoose')
const cryp=require('./secur')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: [String],
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    }
});


var User = mongoose.model('User', userSchema);
export = User;
