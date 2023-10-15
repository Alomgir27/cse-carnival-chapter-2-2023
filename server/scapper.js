const express = require('express');
const app = express();
const cheerio = require('cheerio');
const request = require('request');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const axios = require('axios');






const url = 'https://www.doctorsinfo.org/';

const { User } = require('./models/index');
const { Disease } = require('./models/index');

// connect to mongodb
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const data = [];

        $('div.home_departments > div.container > div.row > div.col-md-3').each((i, el) => {
            const $a = $(el).find('a');
            console.log($a.text());
            console.log($a.attr('href'));

        });
        console.log(data);
    }
});