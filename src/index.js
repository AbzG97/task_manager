const express = require("express");
require("./db/mongoose"); // make sure that mongoose file runs and connects to the server
const app = express();

// setting up routers
const user_router = require("./routers/user_routes");
const task_router = require("./routers/task_routes");



const port = process.env.PORT || 3000;


// parses incoming data as json to be used
app.use(express.json());

app.use(user_router);
app.use(task_router);

app.listen(port, () =>{
    console.log("server is set up on port " + port);
});
