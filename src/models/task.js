const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
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
}, "tasks");



module.exports = Task;