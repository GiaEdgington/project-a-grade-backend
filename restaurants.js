'use strict';
const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');

require('dotenv/config');

const apiKey = process.env.API_KEY;
const client = yelp.client(apiKey);


module.exports = router;