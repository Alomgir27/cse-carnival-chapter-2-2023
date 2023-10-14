const mongoose = require('mongoose');

// Define MongoDB schemas for your app

// User Schema (for both patients and doctors)
const userSchema = new mongoose.Schema({
    username: String,
    password: String, // You should hash and salt passwords for security
    name: String,
    contact: {
        address: [mongoose.Schema.Types.Mixed], // Store multiple addresses as needed
        phoneNumber: String,
    },
    email: String,
    biometricData: {
        fingerprint: String,
        faceRecognition: String,
    },
    profile: {
        //patient
        patient: {
            medicalHistory: [mongoose.Schema.Types.Mixed], // Store multiple medical history records as needed
            medications: [mongoose.Schema.Types.Mixed], // Store multiple medications as needed
            allergies: [String],
            balance: Number,
            personalConsultant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
        //doctor
        doctor: {
            specializations: [String],
            certifications: [String],
            availability: [{
                day: String,
                time: {
                    start: String,
                    end: String,
                }
            }],
            newPatientFee: Number,
            followUpFee: Number,
            rating: Number,
            reviews: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }],
            followUp: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }],
            patients: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }],
        },
        //consultant
        consultant: {
            fees: Number,
        },
        //admin
        admin: {

        },
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'consultant', 'admin'],
        default: 'patient',
    },
    subscription: {
        type: String,
        enum: ['free', 'basic', 'premium'],
        default: 'free',
    },
}, { timestamps: true });

const reviewsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    review: String,
    rating: Number,
    createdAt: Date,
}, { timestamps: true });



// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Patient
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Doctor
    appointmentDate: Date,
    serialNumber: Number
}, { timestamps: true });

// Electronic Health Record (EHR) Schema
const ehrSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    data: String, // Store EHR data as needed
}, { timestamps: true });


// Health and Fitness Data Schema (for wearables)
const patientHealthDataSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vitalSigns: {
        heartRate: Number,
        bloodPressure: String,
        temperature: Number,
    }
}, { timestamps: true });

// Health Education Content Schema
const healthBlogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    tags: [String],
    likes: [mongoose.Schema.Types.ObjectId],
    dislikes: [mongoose.Schema.Types.ObjectId],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
}, { timestamps: true });

const diseaseSchema = new mongoose.Schema({
    name: String,
    symptoms: [String],
    precautions: [String],
    treatment: [String],
    medicines: [String],
    doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });


const subscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subscription: {
        type: String,
        enum: ['free', 'basic', 'premium'],
        default: 'free',
    },
    expiryDate: Date,
    payment: {
        amount: Number,
        paymentMethod: String,
        paymentDate: Date,
    },
}, { timestamps: true });




// Define MongoDB models using the schemas
const User = mongoose.model('User', userSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const EHR = mongoose.model('EHR', ehrSchema);
const PatientHealthData = mongoose.model('PatientHealthData', patientHealthDataSchema);
const HealthBlog = mongoose.model('HealthBlog', healthBlogSchema);
const Review = mongoose.model('Review', reviewsSchema);
const Disease = mongoose.model('Disease', diseaseSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);


module.exports = {
    User,
    Appointment,
    EHR,
    PatientHealthData,
    HealthBlog,
    Review,
    Disease,
    Subscription
};