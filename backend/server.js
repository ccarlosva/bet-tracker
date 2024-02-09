// Packages
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config()

const app = express();

// DB Connection
connectDB();

// set port
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
//login middleware
app.use('/', require("./routes/userRoutes"));
app.use('/', require("./routes/betsRouter"));
//middleware for user actions
// app.use('/api/user', require("./routes/userRoutes"))
app.use(errorHandler)


// create server
app.listen(port, () => {
    console.log(`Server running on PORT ${port}`)
})