const express = require('express');
const app = express();
const cors = require('cors');

//Middleware
app.use(cors());

//import routes
const restaurants = require('./restaurants');
const getNew = require('./new_restaurants');

app.use('/restaurants', restaurants);

app.use('/new_restaurants', getNew);

app.listen(3000);