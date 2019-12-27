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

    client.search(searchRequest).then(response => {
        //const responseJson = JSON.stringify(response.jsonBody.businesses, null, 4);
        const yelpResponse = response.jsonBody.businesses;

        //fetch from nycData
        let returnRestaurants = [];
        //let counter = 0;

        yelpResponse.forEach(restaurant => {
           //returnRestaurants.push(restaurant);
           //need to html encode restaurant names
            let name = restaurant.name.toUpperCase();
            let zipcode = restaurant.location.zip_code;
            // //counter++;
            returnRestaurants.push(name + ":" + zipcode);
            // fetch(`https://data.cityofnewyork.us/resource/43nn-pn8j.json?dba=${name}&zipcode=${zipcode}&$order=grade_date%20DESC&$limit=1`, {
            //     headers: {
            //         'Host': 'data.seattle.gov',
            //         'Content-type': 'application/json',
            //         'Accept': 'application/json',
            //         'X-App-Token': token
            //     }
            // })
            // .then(cityresponse => cityresponse.json())
            // .then(cityresponse => {
            //     counter++;
            //     //returnRestaurants.push("test")
            //     // if (response.grade == "A") {
            //     //     returnRestaurants.push(restaurant);
            //     // }
            // })
        });

        res.send(returnRestaurants);
    }).catch(e => {
        res.send(e);
    });
});


module.exports = router;