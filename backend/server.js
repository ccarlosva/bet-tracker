// Packages
const express = require("express");
const errorHandler = require("./middleware/errorHandler");


const app = express();

// set port
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
//login middleware
 app.use('/', require("./routes/userRoutes"));
//middleware for user actions
// app.use('/api/user', require("./routes/userRoutes"))
app.use(errorHandler)


// create server
app.listen(port, () => {
    console.log(`Server running on PORT ${port}`)
})