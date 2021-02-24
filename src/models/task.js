const mongoose = require("mongoose");
const validator = require("validator");

const taskScehma = new mongoose.Schema({
    title: {
        type: "string",
        required: true
    }, 
    desc : {
        type: 'string',
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
});

const Task = mongoose.model("Task", taskScehma, "tasks");



module.exports = Task;