const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DBCONNECT);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');

app.use('/signup',signupRoute);
app.use('/login',loginRoute);

app.listen(process.env.PORT || 8000);