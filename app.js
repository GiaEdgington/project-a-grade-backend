const express = require('express');
const app = express();
const cors = require('cors');

//Middleware
app.use(cors());

//ROUTE
const restaurants = require('./restaurants');
app.use('/restaurants', restaurants);

app.listen(3000);