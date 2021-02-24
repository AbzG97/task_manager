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
 
 // deletes a task using Id
 task_router.delete('/tasks/:id', async (req, res) => {
     const id = req.params.id;
     try {
         const deletedTask = await Task.findByIdAndDelete(id);
         if(!deletedTask){
             return res.send("can't delete a task that doesn't exist");
         } else {
             console.log("the following task has been deleted \n", deletedTask);
             res.status(200).send(deletedTask);
         }
     } catch (e){
         res.status(500).send(e);
     }


 });

 task_router.put('/tasks/:id', async (req, res) => {
    
     const updates = Object.keys(req.body);
     const validUpdates = [ 'title', 'desc', 'completed' ];
     const isValid = updates.every((update) => validUpdates.includes(update));
     
     if(isValid == false){ // making sure if the updates inputed are valid
        return res.status(400).send({"error" : "invalid updates"});
    } else {
        // applying the updates to the task
        const id = req.params.id;

        try {
            const task = await Task.findById(id); // getting the task
            if(!task){
                return res.status(400).send({"error" : "can't update a task that doen't exist"});
            } else {
                updates.forEach((update) => task[update] = req.body[update]); // applying the updates
                await task.save(); // saving the updates
                console.log("task updated \n", task);
                res.status(200).send(task);
            }
        } catch (e){
            res.status(500).send({error : "internal server error"});
        }
    }
 });
 
 
 
 
 module.exports = task_router;