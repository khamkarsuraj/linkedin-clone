const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database")

// Middleware 
app.use(cors());
app.use(express.json());

// Routes

app.post("/register", async(req, res) =>{
    try {
        const user_info = req.body;
        //console.log(user_info.first)
        // this code is to add new user into system
        const new_user = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
            [user_info.first, user_info.last, user_info.email, user_info.password]
        );
        res.json(new_user);
    } catch (err) {
        console.error(err.message);
    }
})

// To connect React (Frontend)
app.listen(5001, () => {
    try {
        console.log("Port 5001");
    } catch (error) {
        console.error(error.message);
    }
});