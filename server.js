const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");

//init app
const app = express();

//connect to DB
connectDB();

//init middleware
app.use(cors());
app.use(express.json({ extended: false }));

//define request
app.get("/", (req, res) => res.send("API for iceream-shop up and  running  (づ｡◕‿‿◕｡)づ"));


//define routes
app.use("/api/icecream", require("./routes/api/icecream"));

//define port
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server Started on Port ..${PORT}`));

