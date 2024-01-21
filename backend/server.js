require('dotenv').config();
const port = 5050;
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: true
}));

const pool = mysql.createPool({
    host:"localhost",
    user:"admin",
    password:"admin",
    database:"test",
    connectionLimit:10,
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    pool.query('INSERT INTO users (email, pass) VALUES (?, ?)', [email, hashedPassword], (err) => {
        if (!err) {
            res.status(201).send('User created!');
        }
        else {
            console.error(err);
            res.status(500).send('An error occurred while creating the user.');
        }
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('An error occurred while logging in.');
            return;
        }

        if (results.length > 0) {
            const user = results[0];
            const validPassword = bcrypt.compareSync(password, user.pass);
            if (validPassword) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                res.json({ auth: true, token: token });
            }
            else {
                res.status(401).send('Invalid password!');
            }
        }
        else {
            res.status(404).send('User not found!');
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hi!');
   });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});