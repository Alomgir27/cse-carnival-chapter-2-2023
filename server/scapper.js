const express = require('express');
const app = express();
const cheerio = require('cheerio');
const request = require('request');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const axios = require('axios');

const config = require('./config');





const url = 'https://www.doctorsinfo.org/';

const { User } = require('./models/index');
const { Disease } = require('./models/index');

// connect to mongodb
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// const diseaseSchema = new mongoose.Schema({
//     name: String,
//     symptoms: [String],
//     precautions: [String],
//     treatment: [String],
//     medicines: [String],
//     doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// }, { timestamps: true });

// const userSchema = new mongoose.Schema({
//     username: String,
//     password: String, // You should hash and salt passwords for security
//     name: String,
//     contact: {
//         address: [mongoose.Schema.Types.Mixed], // Store multiple addresses as needed
//         phoneNumber: String,
//     },
//     email: {
//         type: String,
//         unique: true,
//     },
//     imageUri: String,
//     biometricData: {
//         fingerprint: String,
//         faceRecognition: String,
//     },
//     profile: {
//         //patient
//         patient: {
//             medicalHistory: [mongoose.Schema.Types.Mixed], // Store multiple medical history records as needed
//             medications: [mongoose.Schema.Types.Mixed], // Store multiple medications as needed
//             allergies: [String],
//             balance: Number,
//             personalConsultant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//         },
//         //doctor
//         doctor: {
//             specializations: [String],
//             certifications: String,
//             availability: {
//                 day: [String], //['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
//                 time: {
//                     start: String,
//                     end: String,
//                 }
//             },
//             newPatientFee: Number,
//             followUpFee: Number,
//             rating: Number,
//             reviews: [{
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Review'
//             }],
//             followUp: [{
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User'
//             }],
//             patients: [{
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User'
//             }],
//             isVerified: {
//                 type: Boolean,
//                 default: false,
//             }
//         },
//         //consultant
//         consultant: {
//             fees: Number,
//             isBusy: Boolean,
//         }
//     },
//     role: {
//         type: String,
//         enum: ['patient', 'doctor', 'consultant', 'admin'],
//         default: 'patient',
//     },
//     subscription: {
//         type: String,
//         enum: ['free', 'basic', 'premium'],
//         default: 'free',
//     },
// }, { timestamps: true });



request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);


        $('div.home_departments > div.container > div.row > div.col-md-3').each((i, el) => {
            const $a = $(el).find('a');
            console.log($a.text());
            let diseaseName = $a.text();
            console.log($a.attr('href'));
            let diseaseUrl = $a.attr('href');
            request(diseaseUrl, (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    const $div = $('div.category_area > div.container > div.row > div.col-md-12 > div.single_cat_page').each((i, el) => {
                        const doctorName = $(el).find('h2').find('a').text();
                        console.log(doctorName);
                        const specialist = $(el).find('h2').next('h4').text();
                        const doctorUrl = $(el).find('h2').find('a').attr('href');
                        console.log(doctorUrl);

                    });

                }
            });
        }
        );
    }
}

);