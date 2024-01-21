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


app.get('/', (req, res) => {
    res.send('EJ NAHUJ!');
   });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});