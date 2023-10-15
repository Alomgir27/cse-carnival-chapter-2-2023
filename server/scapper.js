const express = require('express');
const app = express();
const cheerio = require('cheerio');
const request = require('request');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const axios = require('axios');

const config = require('./config');





const url = 'https://www.doctorsinfo.org/category/blogs/';

const { HealthBlog } = require('./models/index');

// connect to mongodb
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// const healthBlogSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     title: String,
//     content: String,
//     tags: [String],
//     likes: [mongoose.Schema.Types.ObjectId],
//     dislikes: [mongoose.Schema.Types.ObjectId],
//     reviews: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Review'
//     }],
// }, { timestamps: true });



// request(url, (error, response, html) => {
//     if (!error && response.statusCode == 200) {
//         const $ = cheerio.load(html);

//         $('div.category_area > div.container > div.row > div.col-md-12 > div.single_cat_page').find('h2').each((i, el) => {
//             const title = $(el).text();
//             const link = $(el).find('a').attr('href');
//             request(link, (error, response, html) => {

//                 const $ = cheerio.load(html);
//                 const content = $('p').text();
//                 console.log(content);
//                 const healthBlog = new HealthBlog({
//                     title: title,
//                     content: content,
//                     tags: ['health', 'blog', link],
//                 });
//                 healthBlog.save()
//                     .then(() => console.log('HealthBlog saved'))
//                     .catch(err => console.log(err));
//             });
//         }
//         );
//     }
// }
// );

HealthBlog.find()
    .then(healthBlogs => {
        //remove contents <img to end with > to remove images
        healthBlogs.forEach(healthBlog => {
            const content = healthBlog.content;
            const newContent = content.replace(/<img[^>]*>/g, "");
            healthBlog.content = newContent;
            healthBlog.save()
                .then(() => console.log('HealthBlog saved'))
                .catch(err => console.log(err));
        });
    }
    )
