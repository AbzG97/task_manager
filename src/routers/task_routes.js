const express = require("express");
const Task = require("../models/task");
require("../db/mongoose"); // make sure that mongoose file runs and connects to the server

const task_router = new express.Router();
// resource creation route for tasks
task_router.post('/tasks', async (req, res) => {
    // res.send(req.body);
    const newTask = new Task({
        title: req.body.title,
        desc: req.body.desc,
        completed: req.body.completed
    });
 
    try {
        await newTask.save();
        console.log("the following have been saved to database");
        console.log(newTask);
        res.status(201).send(newTask);
 
 
    } catch (e) {
     res.status(400).send(err);
    }
 
 
 });
 
 // get all of the records in the tasks collection
 task_router.get('/tasks', async (req, res) => {
 
     try {
         const task = await Task.find({});
         res.status(200).send(task);
 
 
     } catch (e) {
         res.status(500).send(e);
 
     }
   
 });
 
 
 
 
 
 // get a single task by its ID
 task_router.get('/tasks/:id', async (req, res) => {
     const id = req.params.id;
 
     try {
         const foundTask = await Task.findById(id);
         if(!foundTask){
             return res.status(404).send("data not found");
         } else {
             res.status(200).send(foundTask);
         }
 
 
     } catch (e) {
         res.status(500).send(e);
 
     }
 });
 
 
 
 
 // deleting users based on their ids
 task_router.delete("/users/:id", async (req, res) => {
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
 
 module.exports = task_router;