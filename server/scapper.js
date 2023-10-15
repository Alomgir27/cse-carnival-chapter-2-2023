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


request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const data = [];

        $('.col-md-3').each((i, el) => {
            const $a = $(el).find('a');
            console.log($a.text());
            console.log($a.attr('href'));

        });
        console.log(data);
    }
});