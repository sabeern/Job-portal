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
app.use(express.static('public'));

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const jobRoute = require('./routes/jobs');
const postRoute = require('./routes/post');

app.use('/signup', signupRoute);
app.use('/signin', loginRoute);
app.use('/user', userRoute);
app.use('/jobs', jobRoute);
app.use('/post', postRoute);

app.listen(process.env.PORT || 8000);