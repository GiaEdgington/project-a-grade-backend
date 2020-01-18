const express = require('express');
const app = express();
const cors = require('cors');

//Middleware
app.use(cors());

//ROUTE
const restaurants = require('./restaurants');
const newRestaurants = require('./new');

app.use('/restaurants', restaurants);

app.use('/new', newRestaurants);

app.listen(3000);