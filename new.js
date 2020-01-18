'use strict';
const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const fetch = require('node-fetch');

require('dotenv/config');

const apiKey = process.env.API_KEY;
const client = yelp.client(apiKey);

router.get('/new', (req, res) => {

    //Determine if request is location or coordinate based search and set parameters.
    
        let searchRequest = {
            term: 'Restaurants',
            location: 'New York City',
            atributes: 'hot_and_new'
        };

    //Submit Yelp API search with request.
    client.search(searchRequest).then(response => {
        const responseJson = JSON.stringify(response.jsonBody.businesses, null, 4);
        res.send(responseJson);
    })
    .catch(e => {
        res.send(e);
    });
});

module.exports = router;