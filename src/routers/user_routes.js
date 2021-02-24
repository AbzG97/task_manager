const express = require('express');
const User = require("../models/user");
require("../db/mongoose"); // make sure that mongoose file runs and connects to the server

const user_router = new express.Router();

// resource creation route
user_router.post('/users', async (req, res) =>{
    const newUser = new User({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await newUser.save(); // if data is saved with no errors res will run if not the error will be caught
        res.status(201).send(newUser);

    } catch (e) {
        res.status(400).send(e);
    }
    
}); 


// get all of the user records
user_router.get('/users', async (req, res) => {

    try {
        const searchQuery = await User.find({});
        res.send(searchQuery);


    } catch (e) {
        res.status(500).send(e);
    }
    
});

// get a single user using ID
user_router.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id); // supposed to return a fulfilled promise data 
        if(!user){
            return res.status(404).send("user data not found");
        } else {
            res.status(200).send(user);
        }

    } catch (e) {
        res.status(500).send(e);
    }
   
});

// updating user data based on their IDs
user_router.put('/users/:id', async (req, res) => {
    // specified what updates are valid which are valid
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
    
    if(isValidUpdate == false){
        return res.status(400).send({'error' :'Invalid updates'});
    }
    const id = req.params.id;

    try {
        const user = await  User.findById(id);
        if(!user){
            return res.status(404).send("can't update the data of a user that doesn't exist");
        } else {
            updates.forEach((update) => user[update] = req.body[update]);
            await user.save();
            console.log("the following user has been updated");
            console.log(user);
            res.status(200).send(user);
        }

    } catch (e){
        res.status(500).send(e);

    }
});

// deleting users based on their ids
user_router.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            res.status(404).send("can't delete a user that doesn't exist");

        } else {
            console.log("the following user has been deleted");
            console.log(deletedUser);
            res.status(200).send(deletedUser);
        }

    } catch (e){
        res.status(500).send(e);
    }
    
});


module.exports = user_router;