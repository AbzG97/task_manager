require("../src/db/mongoose");
const { deleteOne } = require("../src/models/task");
const Task = require("../src/models/task");
const User = require("../src/models/user");




// Task.findByIdAndUpdate("6029a4991b1d39495cdd9af0", {completed: false}).then((task) =>{
//     console.log(task);
//     return Task.countDocuments({completed: false});
// }).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// })

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, {age : age});
//     const count = await User.countDocuments({ age });
//     return count;

// }

// updateAgeAndCount("602699a692d7a90dfcd8d719", 23).then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err);
// })

const delTaskAndCount = async (id, status) => {
    const taskToBeDel = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: status}); // finds all incompleted tasks
    return count;
}

delTaskAndCount("60269e4b13ce34106c85a7ed", true).then((result) => {
    console.log("tasks completed", result);
}).catch((err) => {
    console.log(err);
})