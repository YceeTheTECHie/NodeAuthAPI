const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { default: validator } = require("validator");
const userSchema = new mongoose.Schema({
    email: {
        type: String, unique: true, lowercase: true, validate: [validator.isEmail, "Email is required   "],
        required: [true, 'Email is required']
    },
    password: { 
        type:String,required: [true,'Password is required'], minlength:8,select:false,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;