const { Review } = require('../models/index');
const { User } = require('../models/index');

// // Review routes
// router.get('/reviews', reviewController.getAllReviews);
// router.get('/reviews/:id', reviewController.getReview);
// router.post('/reviews', reviewController.createReview);
// router.put('/reviews/:id', reviewController.updateReview);
// router.delete('/reviews/:id', reviewController.deleteReview);

// const reviewsSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     review: String,
//     rating: Number,
//     createdAt: Date,
// }, { timestamps: true });

//@ROUTE: GET /api/reviews
//@DESC: Get all reviews
//@ACCESS: Public

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({
            success: true,
            data: reviews,
            messsage: 'Successfully fetched all reviews'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
}


//@ROUTE: GET /api/reviews/:id
//@DESC: Get a review by id
//@ACCESS: Public

const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: review,
            messsage: 'Successfully fetched review'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
}

//@ROUTE: POST /api/reviews
//@DESC: Create a new review
//@ACCESS: Public

const createReview = async (req, res) => {
    const { body } = req;

    try {
        const review = await Review.create(body);
        const user = await User.findById(body.user);
        user.reviews.push(review._id);
        await user.save();
        res.status(200).json({
            success: true,
            data: review,
            messsage: 'Successfully created review'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
}


//@ROUTE: PUT /api/reviews/:id
//@DESC: Update a review by id
//@ACCESS: Public

const updateReview = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            data: review,
            messsage: 'Successfully updated review'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
}


//@ROUTE: DELETE /api/reviews/:id
//@DESC: Delete a review by id
//@ACCESS: Public

const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: review,
            messsage: 'Successfully deleted review'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
}

module.exports = {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
}