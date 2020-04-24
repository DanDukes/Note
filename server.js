// Dependencies
const express = require("express");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//server public folder
app.use(express.static(__dirname + "/public"));

// Routes
//html routes
require("./routes/htmlRoutes")(app);

//api routes
require("./controllers/noteController")(app);
  
// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });