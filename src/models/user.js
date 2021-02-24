const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
    
});


// middleware that will apply to all User model that use the method save() 
// meaning the create user and update user will use this middleware
// this middleware will hash passwords when they are created or modified
userSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);

    }

    next(); // means that the function is over



});

// create a model of an object that can be used when inserting data into db
const User = mongoose.model("User", userSchema, "users");


module.exports = User;
