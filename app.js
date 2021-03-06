const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config =  require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('connected to database '+config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('database error '+err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3300;

//CORS Middleware
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Midleware
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('invalid Endpoint');
});

app.listen(port, () => {
    console.log('server started at port '+port);
});