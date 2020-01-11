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
    let returnRestaurants = [];

    //Determine if request is location or coordinate based search and set parameters.

    if (req.query.location){
        searchRequest = {
            term: req.query.term,
            location: req.query.location,
            sort_by: 'rating'
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
        const yelpResponse = response.jsonBody.businesses;
        let counter= 0;
        yelpResponse.forEach(restaurant => {
            //need to normalize restaurant names
            let name = restaurant.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("&", "%26").toUpperCase();
            let zipcode = restaurant.location.zip_code;

            fetch(`https://data.cityofnewyork.us/resource/43nn-pn8j.json?dba=${name}&zipcode=${zipcode}&$order=grade_date%20DESC`, {
                headers: {
                    'Host': 'data.cityofnewyork.us',
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-App-Token': token
                }
            })
            .then(cityresponse => cityresponse.json())
            .then(cityresponse => {
                counter++;
                for (let i of cityresponse){
                    if (i.grade == "A") {
                        returnRestaurants.push(restaurant);
                        break;
                    }
                }
                console.log(counter)
                if (counter == yelpResponse.length - 1) {
                    sendResponse();
                }

            })
            .catch(e => {
                console.log(e);
            })
        })

    })
    .catch(e => {
        res.send(e);
    });

    function sendResponse() {
        res.send(returnRestaurants);
    }

});

module.exports = router;

