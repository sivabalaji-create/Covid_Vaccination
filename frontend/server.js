const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000;
const mongoUrl = "mongodb://localhost:27017";
const dbName = "vaccination_app";
const collectionName = "bookings";

app.use(bodyParser.json());
app.use(express.static("public"));

// Serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Endpoint for user login
app.post("/user-login", (req, res) => {
    // ...
});

// Endpoint for admin login
app.post("/admin-login", (req, res) => {
    // ...
});

// Endpoint for adding vaccination centres
app.post("/add-centres", (req, res) => {
    // ...
});

// Endpoint for getting dosage details
app.get("/dosage-details", (req, res) => {
    // ...
});

// Endpoint for removing vaccination centres
app.delete("/remove-centres/:centreId", (req, res) => {
    // ...
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
