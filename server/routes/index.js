const express = require('express');
const router = express.Router();

const multer = require('multer');


// Require middleware
const validateToken = require('../middleware/validateToken');

// Require controllers
const userController = require('../controllers/userController');
const reviewController = require('../controllers/reviewController');
const appointmentController = require('../controllers/appointmentController.js');
const ehrController = require('../controllers/ehrController');
const patientHealthDataController = require('../controllers/patientHealthDataController');
const healthBlogController = require('../controllers/healthBlogController');
const diseaseController = require('../controllers/diseaseController');
const subscriptionController = require('../controllers/subscriptionController');
const notificationController = require('../controllers/notificationController');

// Multer storage

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadImage = multer({ storage: storage });

// Upload image
router.post('/upload', uploadImage.single('file'), (req, res) => {
    let imageUri = req.file.path.replace(/\\/g, '/');
    res.status(200).json({
        success: true,
        data: imageUri,
        message: 'Successfully uploaded image'
    });
});


// User routes
router.get('/users', validateToken, userController.getAllUsers);
router.get('/users/:id', validateToken, userController.getUser);
router.post('/users/login', userController.loginUser);
router.post('/users/create', userController.createUser);
router.put('/users/:id', validateToken, userController.updateUser);
router.delete('/users/:id', validateToken, userController.deleteUser);


// Review routes
router.get('/reviews', reviewController.getAllReviews);
router.get('/reviews/:id', reviewController.getReview);
router.post('/reviews', reviewController.createReview);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);

// Appointment routes
router.get('/appointments', appointmentController.getAllAppointments);
router.get('/appointments/:id', appointmentController.getAppointment);
router.post('/appointments', appointmentController.createAppointment);
router.put('/appointments/:id', appointmentController.updateAppointment);
router.delete('/appointments/:id', appointmentController.deleteAppointment);

// // EHR routes
router.get('/ehrs', ehrController.getAllEHRs);
router.get('/ehrs/:id', ehrController.getEHR);
router.post('/ehrs', ehrController.createEHR);
router.put('/ehrs/:id', ehrController.updateEHR);
router.delete('/ehrs/:id', ehrController.deleteEHR);


// Patient Health Data routes
router.get('/patienthealthdata', patientHealthDataController.getAllPatientHealthData);
router.get('/patienthealthdata/:id', patientHealthDataController.getPatientHealthData);
router.post('/patienthealthdata', patientHealthDataController.createPatientHealthData);
router.put('/patienthealthdata/:id', patientHealthDataController.updatePatientHealthData);
router.delete('/patienthealthdata/:id', patientHealthDataController.deletePatientHealthData);


// // Health Blog routes
router.get('/healthblogs', healthBlogController.getAllHealthBlogs);
router.get('/healthblogs/:id', healthBlogController.getHealthBlog);
router.post('/healthblogs', healthBlogController.createHealthBlog);
router.put('/healthblogs/:id', healthBlogController.updateHealthBlog);
router.delete('/healthblogs/:id', healthBlogController.deleteHealthBlog);
router.post('/healthblogs/:id/like', healthBlogController.likeHealthBlog);
router.post('/healthblogs/:id/dislike', healthBlogController.dislikeHealthBlog);
router.post('/healthblogs/:id/review', healthBlogController.createHealthBlogReview);
router.get('/healthblogs/:id/review/:reviewId', healthBlogController.getHealthBlogReview);


// // Disease routes
router.get('/diseases', diseaseController.getAllDiseases);
router.get('/diseases/:id', diseaseController.getDisease);
router.post('/diseases', diseaseController.createDisease);
router.put('/diseases/:id', diseaseController.updateDisease);
router.delete('/diseases/:id', diseaseController.deleteDisease);

// // Subscription routes
router.get('/subscriptions', subscriptionController.getAllSubscriptions);
router.get('/subscriptions/:id', subscriptionController.getSubscription);
router.post('/subscriptions', subscriptionController.createSubscription);
router.put('/subscriptions/:id', subscriptionController.updateSubscription);
router.delete('/subscriptions/:id', subscriptionController.deleteSubscription);

// // Notification routes
router.get('/notifications', notificationController.getAllNotifications);
router.get('/notifications/:id', notificationController.getNotification);
router.post('/notifications', notificationController.createNotification);
router.put('/notifications/:id', notificationController.updateNotification);
router.delete('/notifications/:id', notificationController.deleteNotification);


module.exports = router;

