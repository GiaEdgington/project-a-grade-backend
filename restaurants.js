'use strict';
const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const fetch = require('node-fetch');


require('dotenv/config');

const apiKey = process.env.API_KEY;
const client = yelp.client(apiKey);
const token = 'ecmGOZdhBzQna3iHZAWezOPHX';

router.get('/', (req, res) => {

    let searchRequest = {};

    //Determine if request is location or coordinate based search and set parameters.

    if (req.query.location){
        searchRequest = {
            term: req.query.term,
            location: req.query.location
        };
    } else if (req.query.latitute && req.query.longitude) {
        searchRequest = {
            term: 'Restaurants',
            latitude: req.query.latitude,
            longitude: req.query.longitude
        };
    }

    //Submit Yelp API search with request.

    //client.search(searchRequest).then(response => {
        //const responseJson = JSON.stringify(response.jsonBody.businesses, null, 4);
        //const yelpResponse = response.jsonBody.businesses;

        //fetch from nycData
        let returnRestaurants = [];
        //let counter = 0;

        //yelpResponse.forEach(restaurant => {
           //returnRestaurants.push(restaurant);
           //need to html encode restaurant names
           //let name = restaurant.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("&", "%26").toUpperCase();//entities.encode(restaurant.name);
            //let zipcode = restaurant.location.zip_code;
            // //counter++;
            //returnRestaurants.push(name + ":" + zipcode);
            fetch('https://data.cityofnewyork.us/resource/43nn-pn8j.json?dba=BRAVEST', {
                headers: {
                    'Host': 'data.cityofnewyork.us',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-App-Token': token
                }
            })
            .then(cityresponse => cityresponse.json())
            .then(cityresponse => {
                //console.log(cityresponse);
                //counter++;
                //console.log(cityresponse);
                returnRestaurants.push(cityresponse);
                // if (response.grade == "A") {
                //     returnRestaurants.push(restaurant);
                // }
                res.json(cityresponse);
             })
             .catch(e => {
                console.log(e);
            })
        //});
    //})
    //.catch(e => {
    //    res.send(e);
    //});
    

});

module.exports = router;