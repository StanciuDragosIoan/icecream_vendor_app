const express = require("express");
const connectDB = require("./config/db");

//init app
const app = express();

//connect to DB
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//define request
app.get("/", (req, res) => res.send("API for iceream-shop up and  running  (づ｡ ◕‿‿◕｡)"));
//add item
//app.post("/add", (req, res) => res.send("Icecream Route for adding icecream items"));
//delete item
//app.get("/delete/:id", (req, res) => res.send("Delete a single icecream item)"));

//define routes
app.use("/api/icecream", require("./routes/api/icecream"));

//define port
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server Started on Port ..${PORT}`));

