const mongoose = require("mongoose");
const validator = require("validator");


// create a model of an object that can be used when inserting data into db
const User = mongoose.model("User", {
    name: {
        type: "string",
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(val){
            if(val < 0){
                throw new Error("age must a positive number");
            }
        } // end of validate
    }, // end of age
    email: {
        type: "string",
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email not valid");
            } 
        } // end of validate
    }, // end of email
    password: {
        type: "string",
        required: true,
        trim: true,
        validate(val){
            if(val.length < 6){
                throw new Error("password length too short")
            } if(val.toLowerCase().includes("password")){
                throw new Error("don't include the word 'password' in your password");
            }
        }
    }
    
} , "users");


module.exports = User;
