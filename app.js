const express = require('express');
const app = express();

//ROUTE
app.get('/', function(req, res){
    res.send('hello');
})

//ROUTE
const restaurants = require('./restaurants');
app.use('/restaurants', restaurants);

app.listen(3000);