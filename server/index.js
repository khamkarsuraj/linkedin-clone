const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database")
//const bcrypt = require("bcrypt");
const jwtTokens = require("./utils/jwt-helpers");
const jwtDecode = require("./utils/jwt-decode");
const dotenv = require("dotenv");
const authenticateToken = require("./middleware/authorization");
const cookieParser = require('cookie-parser');

dotenv.config();

// Middleware 
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.post("/register", async(req, res) =>{
    try {
        const user_info = req.body;
        // this code is to add new user into system
        const new_user = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
            [user_info.first, user_info.last, user_info.email, user_info.password]
        );
        //res.json(jwtTokens(new_user.rows[0]));
        res.json(new_user);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/signin", async(req, res) =>{
    try {
        // Fetch email and password from request
        const {email, password} = req.body;

        // Fire query in database and check if user exists, Error if no
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (users.rows.length === 0) return res.status(401).json({error:"Email is incorrect"});

        // Checking for password
        // TODO: Not sure, why bcrypt.compare doesn't work. Check later.
        // const validPassword = await bcrypt.compare(password, users.rows[0].password);
        const validPassword = (password === users.rows[0].password) ? true : false;
        if (!validPassword) return res.status(401).json({error: "Incorrect password"});

        // To Access and Refresh token
        let tokens = jwtTokens(users.rows[0]);
        res.cookie('refresh_token', tokens.refreshToken, {httpOnly: true, path: "/", secure: true, sameSite: 'none'});
        res.json({
            user_email: users.rows[0].email,
            user_name: users.rows[0].first_name + ' ' + users.rows[0].last_name,
            accessToken: tokens.accessToken,
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const authHeader = req.headers['authorization']; //Bearer TOKEN
        const token = authHeader && authHeader.split(' ')[1];
        const user_info = jwtDecode(token)
        const info = await pool.query('SELECT * FROM users WHERE email = $1', [user_info.email]);
        res.json({user: info.rows[0]});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

app.get('/edit', authenticateToken, async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const user_info = jwtDecode(token)
        const info = await pool.query('SELECT u.user_id, u.first_name, u.last_name, ui.phone, ui.address, ui.birthday FROM users u INNER JOIN user_info ui ON u.user_id=ui.user_id AND u.user_id=$1;', [user_info.user_id]);
        /* If user doesn't inserted details yet, return none */
        if (info.rowCount === 0) {
            console.log(user_info);
            //res.json('None');
            return res.json({user: user_info})
        }
        return res.json({user: info.rows[0]});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});

app.post("/update", async(req, res) =>{
    try {
        const user_info = req.body;
        // this code is to update existing user into system
        console.log('user', user_info);
        const updated_user = await pool.query (
            `WITH updated_data AS (
                UPDATE users
                SET first_name = $1, last_name = $2
                WHERE user_id = $3
                RETURNING user_id
              )
              UPDATE user_info
              SET phone = $4, address = $5, birthday = $6
              WHERE user_id IN (SELECT user_id FROM updated_data);`,
            [user_info.first, user_info.last, user_info.id, user_info.phone, user_info.address, user_info.birthday]
        );
        res.json(updated_user);
    } catch (err) {
        console.error(err.message);
    }
});

// To connect React (Frontend)
app.listen(5001, () => {
    try {
        console.log("Port 5001");
    } catch (error) {
        console.error(error.message);
    }
});